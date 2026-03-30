const express = require("express");
const router = express.Router();

const User = require("../models/User");
const bcrypt = require("bcryptjs");

/*
ASSIGN ROLE
*/
router.put("/users/:id/role", async (req, res) => {
    const { role } = req.body;

    const allowedRoles = ["admin", "cashier", "manager"];

    if (!allowedRoles.includes(role)) {
        return res.status(400).json({ error: "Invalid role" });
    }

    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { role },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ message: "Role updated", user });

    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

/*
RESET PASSWORD
*/
router.post("/users/reset-password", async (req, res) => {
    const { userId, newPassword } = req.body;

    if (!newPassword) {
        return res.status(400).json({ error: "Password required" });
    }

    try {
        const password_hash = await bcrypt.hash(newPassword, 10);

        const user = await User.findByIdAndUpdate(
            userId,
            { password_hash },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ message: "Password reset successful" });

    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

/*
DISABLE ACCOUNT
*/
router.put("/users/:id/disable", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { isActive: false },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ message: "User disabled", user });

    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;