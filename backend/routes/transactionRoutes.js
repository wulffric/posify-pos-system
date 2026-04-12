const express = require("express");
const router = express.Router();

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

// C3 - Confirm purchase
router.post('/confirm', async (req, res) => {
  const { items, total_amount } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "Cart is empty" });
  }

  try {
    const newTransaction = new Transaction({
      items,
      total_amount,
      date: new Date(),
      status: "confirmed"
    });

    await newTransaction.save();

    res.json({
      message: "Purchase confirmed",
      transaction: newTransaction
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
