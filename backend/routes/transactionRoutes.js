const express = require("express");
const Product = require("../models/Product");
const Transaction = require("../models/Transaction");
const calculateTotal = require("../utils/calculateTotal");

const router = express.Router();

// Process cash payment
router.post("/", async (req, res) => {
  try {
    const { items, paymentType, amountPaid } = req.body;

    const total = calculateTotal(items);
    const paid = Number(amountPaid || 0);

    if (paymentType === "cash" && paid < total) {
      return res.status(400).json({
        message: "Insufficient payment"
      });
    }

    const change = paymentType === "cash" ? paid - total : 0;

    const transaction = new Transaction({
      items,
      total,
      paymentType,
      amountPaid: paid,
      change
    });

    await transaction.save();

    return res.status(201).json(transaction);
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
});

// Receipt retrieval
router.get("/receipt/:id", async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found"
      });
    }

    return res.status(200).json(transaction);
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;
