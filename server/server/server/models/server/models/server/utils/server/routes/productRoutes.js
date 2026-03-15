const express = require("express");
const Product = require("../../backend/models/Product");

const router = express.Router();

// Add Product API
router.post("/", async (req, res) => {
  try {
    const { name, barcode, price, quantity, category } = req.body;

    if (!name || !barcode || price === undefined || quantity === undefined) {
      return res.status(400).json({
        message: "Missing required fields"
      });
    }

    const existing = await Product.findOne({ barcode });

    if (existing) {
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

    await product.save();

    return res.status(201).json(product);
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
});

// Barcode lookup API
router.get("/barcode/:barcode", async (req, res) => {
  try {
    const product = await Product.findOne({
      barcode: req.params.barcode
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;
