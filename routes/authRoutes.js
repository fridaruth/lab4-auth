/**
 * routes for auth
 */

const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
require("dotenv").config();

router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        // validera input
        if (!username || !password) {
            return res.status(400).json({ error: "Användarnamn och lösenord krävs!" });
        }

        // skapa och spara användare
        const user = new User({
            username: username,
            password: password
        });
        await user.save();

        res.status(201).json({ message: "Användare skapad!" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Kunde inte registrera användare!" })
    }
});

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // kontrollera input
        if (!username || !password) {
            return res.status(400).json({ error: "Användarnamn och lösenord krävs" });
        }

        // kolla om användare finns
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: "Felaktigt användarnamn eller lösenord" });
        }

        // kontrollera lösenord
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ error: "Felaktigt användarnamn eller lösenord" });
        }

        // skapa JWT-token
        const payload = { username: user.username };
        const secretKey = process.env.JWT_SECRET_KEY;
        const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });

        res.status(200).json({
            message: "Inloggning lyckades!",
            token: token
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Serverfel vid inloggning" });
    }
});

// protected route
router.get("/protected", authenticateToken, (req, res) => {
    res.json({ 
        message: "Skyddad route!",
        user: req.username 
    });
});

// validate token
function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token == null) {
        return res.status(401).json({ message: "Not authorized for this route - token missing! " });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: "incorrect JWT" });

        req.username = user.username;
        next()
    })
}

module.exports = router;