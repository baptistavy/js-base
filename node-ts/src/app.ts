import express, { Router } from "express";
import userRoutes from "./routes/user.routes";

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    message: "Node + TypeScript API is running",
    status: "ok",
  });
});

app.use("/users", userRoutes);
export default app;