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

/*
Login user
*/
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            error: "Email and password are required"
        });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                error: "Invalid email or password"
            });
        }

        const passwordMatch = await bcrypt.compare(password, user.password_hash);

        if (!passwordMatch) {
            return res.status(401).json({
                error: "Invalid email or password"
            });
        }

        res.json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({
            error: "Login failed"
        });
    }
});


module.exports = router;