import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../prisma/client";
import { signToken } from "../utils/jwt";
import { AuthRequest } from "../middlewares/auth.middleware";

export class AuthController {
  // POST /auth/register
  static async register(req: Request, res: Response) {
    try {
      const { name, email, password, role } = req.body;

      if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields required" });
      }

      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: role || "STUDENT",
        },
      });

      const token = signToken({
        id: user.id,
        email: user.email,
        role: user.role,
      });

      res.status(201).json({
        message: "User registered successfully",
        token,
      });
    } catch (err) {
      res.status(500).json({ message: "Registration failed", error: err });
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