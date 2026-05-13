/**
 * routes for auth
 */

const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        // validera input
        if (!username || !password) {
            return res.status(400).json({ error: "Användarnamn och lösenord krävs!"});
        }

        // kryptera lösenord
        const hashPassword = await bcrypt.hash(password, 10);

        // skapa och spara användare
        const user = new User({
            username: username,
            password: hashPassword
        });

        await user.save();

        res.status(201).json({ message: "Användare skapad!" })
    } catch (error) {
        res._construct.status(500).json({ error: "Kunde inte registrera användare!" })
    }
});

router.post("/login", async(req, res) => {
    console.log("login called...");
});

module.exports = router;