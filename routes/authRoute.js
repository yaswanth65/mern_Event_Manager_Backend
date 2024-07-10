const express = require('express');
const router = express.Router();
const Auth = require('../models/authModel');

router.post("/register", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Auth.create({ email, password });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Auth.findOne({ email });
        if (user && user.password === password) {
            res.status(200).json({ message: "Login successful" });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
