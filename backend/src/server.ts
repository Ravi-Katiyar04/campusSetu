import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_, res) => res.send("GradPath API running"));

app.use("/auth", authRoutes);

app.listen(5000, () => console.log("Server on 5000"));