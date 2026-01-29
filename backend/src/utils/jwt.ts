import jwt, { Secret, SignOptions } from "jsonwebtoken";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

const JWT_SECRET: Secret = process.env.JWT_SECRET;

export const signToken = (payload: object): string => {
  const options: SignOptions = { expiresIn: "7d" };
  return jwt.sign(payload, JWT_SECRET, options);
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET);
};