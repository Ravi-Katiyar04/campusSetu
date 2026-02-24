import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../prisma/client";
import { signToken } from "../utils/jwt";
import { AuthRequest } from "../middlewares/auth.middleware";

export class AuthController {
  // POST /auth/register
  static async register(req: Request, res: Response) {
    try {
      const { name, email, password, rollNumber } = req.body;

      // 1️⃣ Validate required fields
      if (!name || !email || !password || !rollNumber) {
        return res.status(400).json({ message: "All fields required" });
      }

      // 2️⃣ Validate official college email domain
      const allowedDomain = "knit.ac.in"; // college  email domain
      const emailDomain = email.split("@")[1];

      if (emailDomain !== allowedDomain) {
        return res.status(403).json({
          message: "Use your official college email"
        });
      }

      // 3️⃣ Check if student exists in college registry
      const student = await prisma.studentRegistry.findFirst({
        where: {
          email,
          rollNumber,
        },
      });

      if (!student) {
        return res.status(403).json({
          message: "You are not an authorized college student"
        });
      }

      // 4️⃣ Check if already registered
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({
          message: "User already registered"
        });
      }

      // 5️⃣ Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // 6️⃣ Create user
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: "STUDENT", // Never trust frontend role
        },
      });

      // 7️⃣ Generate JWT
      const token = signToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      return res.status(201).json({
        message: "User registered successfully",
        token,
      });

    } catch (error) {
      return res.status(500).json({
        message: "Registration failed"
      });
    }
  }

  // POST /auth/login
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = signToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      res.json({
        message: "Login successful",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      });
    } catch (err) {
      res.status(500).json({ message: "Login failed", error: err });
    }
  }

  // GET /me
  static async me(req: AuthRequest, res: Response) {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    res.json(user);
  }
}