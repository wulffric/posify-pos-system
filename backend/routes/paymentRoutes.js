const express = require("express");

const router = express.Router();

/*
Validate cash payment
*/
router.post("/payment/cash", (req, res) => {

    const { total, cash_given } = req.body;

    if (cash_given < total) {

        return res.status(400).json({
            error: "Insufficient cash amount"
        });

    }

    const change = cash_given - total;

    res.json({
        approved: true,
        change: change
    });

});

// Card payment approval rejection logic
router.post("/payment/card", (req, res) => {
    const { total, cardNumber } = req.body;
    setTimeout(() => {
        const isApproved = Math.random() > 0.2; // 80% success rate

        if (isApproved) {
            res.json({
                approved: true,
                transactionId: "TXN-" + Math.floor(Math.random() * 1000000),
                message: "Payment Authorized"
            });
        } else {
            res.status(400).json({
                approved: false,
                error: "Card Declined: Insufficient Funds"
            });
        }
    }, 2000); // 2-second delay for "realism"
});

module.exports = router;