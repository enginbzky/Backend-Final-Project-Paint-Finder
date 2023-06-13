import express from "express";
import "./src/config/database.js";
import userRoute from "./src/controller/user-route.js";
import paintRoute from "./src/controller/paint-route.js";
import yachtRoute from "./src/controller/yacht-route.js";
// import commentRoute from "./controller/comment-route.js";
import cors from "cors";
import morgan from "morgan";
import errorHandler from "./src/middleware/errorHandler.js";
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
// API
app.use("/", userRoute);
app.use("/", paintRoute);
app.use("/", yachtRoute);
// app.use("/api/v1/comments", commentRoute);
app.use(errorHandler);

export default app;
