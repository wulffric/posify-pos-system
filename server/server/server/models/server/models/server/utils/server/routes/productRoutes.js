const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

const products = [];

// Add Product API
router.post("/", (req, res) => {
  const { name, barcode, price, quantity, category } = req.body;

  if (!name || !barcode || price === undefined || quantity === undefined) {
    return res.status(400).json({
      message: "Missing required fields"
    });
  }

  const duplicate = products.find(p => p.barcode === barcode);

  if (duplicate) {
    return res.status(409).json({
      message: "Duplicate barcode"
    });
  }

  const product = new Product({
    name,
    barcode,
    price,
    quantity,
    category
  });

  products.push(product);

  res.status(201).json(product);
});

// Barcode lookup API
router.get("/barcode/:barcode", (req, res) => {
  const product = products.find(p => p.barcode === req.params.barcode);

  if (!product) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  res.json(product);
});

module.exports = router;
