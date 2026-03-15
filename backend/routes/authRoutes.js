const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();

const User = require("../models/User");

/*
Register new user
*/
router.post("/register", async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            error: "Name, email and password are required"
        });
    }

    try {

        const password_hash = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password_hash
        });

        await user.save();

        res.json({
            message: "User registered successfully"
        });

    } catch (error) {

        res.status(500).json({
            error: "Registration failed"
        });

    }

});

module.exports = router;