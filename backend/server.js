import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from './routes/product.route.js'

dotenv.config();

const app = express();

//middleware to parse, allows to accept JSON in req.body
app.use(express.json());

app.use('/api/products', productRoutes)
// console.log(process.env.MONGO_URI)


app.listen(5000, () => {
  connectDB();
  console.log(
    "Server has been connected succesfully! \nServer started at http://localhost:5000"
  );
});
