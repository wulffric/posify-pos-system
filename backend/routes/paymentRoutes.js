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

module.exports = router;