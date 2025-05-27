import express from "express";

import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.post("/", createProduct);
router.get("/", getProducts); //gets ALL products
router.get("/:id", getProductById); //get ONE product by id
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
