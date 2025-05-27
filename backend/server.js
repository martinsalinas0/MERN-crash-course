import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";
import mongoose from "mongoose";

dotenv.config();

const app = express();

//middleware to parse, allows to accept JSON in req.body
app.use(express.json());

// console.log(process.env.MONGO_URI)

app.get("/", (req, res) => {
  res.send("hi");
});

//GET product by id
app.get("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ error: "Product not found" });
  }
});

app.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ success: false, message: "Invalid product ID" });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server Error", error: error.message });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const product = req.body; // user will send this data

    if (!product.name || !product.price || !product.image) {
      return res
        .status(404)
        .json({ success: false, message: "please provide all fields" });
    }

    const newProduct = new Product(product);
    try {
      await newProduct.save();
      res.status(201).json({ success: true, message: "Product created" });
    } catch (error) {
      console.error("error in Create product", error.message);
      res.status(500).json({
        success: false,
        message: "Server Error",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Product Deleted",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
});

app.listen(5000, () => {
  connectDB();
  console.log(
    "Server has been connected succesfully! \nServer started at http://localhost:5000"
  );
});
