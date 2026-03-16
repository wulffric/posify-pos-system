const express = require("express");
const router = express.Router();

const Product = require("../models/Product");
const Transaction = require("../models/Transaction");
const calculateTotal = require("../utils/calculateTotal");

// Create a transaction
router.post("/", async (req, res) => {
  try {
    const { items, paymentType } = req.body;

    const total = calculateTotal(items);

    const transaction = new Transaction({
      items,
      total,
      paymentType
    });

    await transaction.save();

    res.json({
      message: "Transaction successful",
      transaction
    });

  } catch (error) {
    res.status(500).json({
      message: "Transaction failed",
      error: error.message
    });
  }
});

// Get all transactions
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; this one?
