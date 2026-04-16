import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";
import progressRoutes from "./routes/progress.routes";
import companyRoutes from "./routes/company.routes";
import profileRoutes from "./routes/profile.routes";
import levelRoutes from "./routes/level.routes";
import moduleRoutes from "./routes/module.routes";

const app = express();
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (_, res) => res.send("GradPath API running"));

app.use("/auth", authRoutes);
app.use("/progress", progressRoutes);
app.use("/companies", companyRoutes);
app.use("/profile", profileRoutes);
app.use("/levels", levelRoutes);
app.use("/modules", moduleRoutes);

app.listen(5000, () => console.log("Server on 5000"));