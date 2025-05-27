import express from "express";
import dotenv from 'dotenv'
import { connectDB } from "./config/db.js";

dotenv.config()


const app = express();

// console.log(process.env.MONGO_URI)



app.get("/", (req, res) => {
  res.send("hi");
});

app.listen(5000, () => {
  connectDB();
  console.log(
    "Server has been connected succesfully! \nServer started at http://localhost:5000"
  );
});
