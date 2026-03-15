const express = require("express");
const Transaction = require("../models/Transaction");
const calculateTotal = require("../utils/calculateTotal");

const router = express.Router();

const transactions = [];

// Process cash payment
router.post("/", (req, res) => {
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

  transactions.push(transaction);

  res.status(201).json(transaction);
});

// Receipt retrieval
router.get("/receipt/:id", (req, res) => {
  const transaction = transactions.find(t => t.id === req.params.id);

  if (!transaction) {
    return res.status(404).json({
      message: "Transaction not found"
    });
  }

  res.json(transaction);
});

module.exports = router;
