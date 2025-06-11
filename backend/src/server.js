import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "../routes/user.route.js";
import connectDB from "../db/index.js";
dotenv.config({
  path: "./.env",
});

const app = express();
connectDB(); // connect to the database

app.use(
  cors({
    origin: "*",
  })
);

app.use("/api/v1/user", router);
app.use(express.json()); //to parse JSON bodies
app.use(express.urlencoded({ limit: "16kb", extended: true })); //to parse urlencoded bodies for form data

app.listen(process.env.PORT, () => {
  console.log(`server is running on http://localhost:${process.env.PORT}/`);
});
