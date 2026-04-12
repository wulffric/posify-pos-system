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

// M3 - Calculate daily totals
router.get('/reports/daily/summary', async (req, res) => {
  const { date } = req.query;

  try {
    const transactions = await Transaction.find({
      date: {
        $gte: new Date(date),
        $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1))
      }
    });

    const total_sales = transactions.reduce((sum, t) => sum + t.total_amount, 0);

    res.json({
      total_sales,
      total_transactions: transactions.length
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
