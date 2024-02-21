import express from "express";
import cors from "cors";
import "./db/prismaClient.js";
import "dotenv/config.js";
import userRouter from "./routes/auth.js";
import Profilesrouter from "./routes/profile.js";
import createProxyHandler from "./utils/proxyHandler.js";
const app = express();

app.use(cors());
app.all("/v1/*", createProxyHandler(process.env.API_URL));
app.use(express.json());
app.use(express.urlencoded());

app.get("/test", (req, res) => {
  console.log(req.url);
  res.json({ message: "actions +" });
});
app.use("/auth", userRouter);
app.use("/profile", Profilesrouter);
app.listen(4001, () => {
  console.log("server running...");
});
