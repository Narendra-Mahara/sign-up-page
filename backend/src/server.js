import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config({
  path: "./.env",
});

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.post("/signup", (req, res) => {
  res.json("Working!!!");
});

app.listen(process.env.PORT, () => {
  console.log(`server is running on http://localhost:${process.env.PORT}/`);
});
