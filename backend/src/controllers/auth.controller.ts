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

      // Validate required fields
      if (!name || !email || !password || !rollNumber) {
        return res.status(400).json({ message: "All fields required" });
      }

      //  Validate official college email domain
      const allowedDomain = "knit.ac.in"; // college  email domain
      const emailDomain = email.split("@")[1];

      if (emailDomain !== allowedDomain) {
        return res.status(403).json({
          message: "Use your official college email"
        });
      }

      // Check if student exists in college registry
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

      // Check if already registered
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({
          message: "User already registered"
        });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          role: "STUDENT", // Never trust frontend role
        },
      });

      //  CREATE PROFILE AUTOMATICALLY
      await prisma.profile.create({
        data: {
          userId: user.id,
          college: "KNIT Sultanpur", // default or from registry
          year: null,
          course: null,
          skills: [],
        },
      });

      return res.status(201).json({
        message: "User registered successfully",
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
      const { email, password, accountType } = req.body;

      // ADMIN LOGIN
      if (accountType === "admin") {
        const admin = await prisma.admin.findUnique({
          where: { email },
        });



        if (!admin) {
          return res.status(400).json({ message: "Invalid credentials" });
        }

        const isMatch = password === admin.password;
        // const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
          return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = signToken({
          id: admin.id,
          email: admin.email,
          role: "ADMIN",
        });

        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        // IMPORTANT: store role separately
        res.cookie("role", "ADMIN");

        return res.json({
          message: "Admin login successful",
          role: "ADMIN",
        });
      }

      // STUDENT LOGIN (DEFAULT)
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

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.cookie("role", user.role);

      return res.json({
        message: "Login successful",
        role: user.role,
      });

    } catch (err) {
      res.status(500).json({ message: "Login failed", error: err });
    }
  }

  // POST /auth/logout
  static async logout(req: Request, res: Response) {
    res.clearCookie("token");
    res.json({ message: "Logged out" });
  }

  // GET /me
  static async me(req: AuthRequest, res: Response) {
    try {
      const userId = req.user.id;
      const role = req.user.role;

      // ADMIN CASE
      if (role === "ADMIN") {
        const admin = await prisma.admin.findUnique({
          where: { id: userId },
          select: {
            id: true,
            email: true,
          },
        });

        if (!admin) {
          return res.status(404).json({ message: "Admin not found" });
        }

        return res.json({
          id: admin.id,
          name: "Admin",
          email: admin.email,
          role: "ADMIN",
          profile: null, // no profile
        });
      }

      // STUDENT CASE
      const userWithProfile = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          profile: {
            select: {
              college: true,
              course: true,
              year: true,
              skills: true,
            },
          },
        },
      });

      if (!userWithProfile) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.json(userWithProfile);

    } catch (error) {
      console.error("ME ERROR:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  }
}