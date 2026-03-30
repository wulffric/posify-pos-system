const express = require("express");
const router = express.Router();

<<<<<<< HEAD
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
=======
const Transaction = require("../models/Transaction");
const Product = require("../models/Product");

/*
REFUND TRANSACTION
*/
router.post("/transactions/:id/refund", async (req, res) => {
    try {
        const transaction = await Transaction.findById(req.params.id);

        if (!transaction) {
            return res.status(404).json({ error: "Transaction not found" });
        }

        if (transaction.status === "refunded") {
            return res.status(400).json({ error: "Already refunded" });
        }

        for (const item of transaction.items) {
            await Product.findByIdAndUpdate(item.productId, {
                $inc: { stock_quantity: item.quantity }
            });
        }

        transaction.status = "refunded";
        await transaction.save();

        res.json({
            message: "Refund successful",
            transaction
        });

    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
>>>>>>> d15e768 (Iteration 2 backend complete: login, role management, refund, user control)
