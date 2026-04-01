const express = require("express");
const bcrypt = require("bcryptjs");

const router = express.Router();
const User = require("../models/User");

/*
REGISTER
*/
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields required" });
    }

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const password_hash = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password_hash
        });

        await user.save();

        res.json({ message: "User registered successfully" });

    } catch (err) {
        res.status(500).json({ error: "Registration failed" });
    }
});

// test route to get all users (for admin purposes)
router.get("/users", async (req, res) => {
    try {
        const users = {'test': 'test'};
        res.json({ users });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

/*
LOGIN
*/
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password required" });
    }

    //hardcoded admin login for testing purposes
    if(email==="admin@gmail.com" && password==="admin"){
        return res.json({
            message: "Login successful",
            user: {
                id: "admin",
                name: "Admin",
                email: email,
                role: "admin"
            }
        });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        if (user.isActive === false) {
            return res.status(403).json({ error: "Account is disabled" });
        }

        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        res.json({
            message: "Login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        res.status(500).json({ error: "Login failed1" });
    }
});

// Logout route (for client-side token clearing if needed)
router.post("/logout", (req, res) => {    
    res.json({ message: "Logout successful" });
});

/*
Login user

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
            error: "Login failed2"
        });
    }
});*/


module.exports = router;