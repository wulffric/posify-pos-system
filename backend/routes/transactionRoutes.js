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
