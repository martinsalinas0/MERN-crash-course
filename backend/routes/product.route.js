import express from "express";
import Product from "../models/product.model.js";
import mongoose from "mongoose";

const router = express.Router();

// router.get("/", (req, res) => {
//   res.send("hi");
// });

//GET product by id
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ error: "Product not found" });
  }
});

router.put("/:id", async (req, res) => {
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

router.post("/", async (req, res) => {
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

router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
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

export default router;
