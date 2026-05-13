/**
 * routes for auth
 */
const express = require("express");
const router = express.Router();

router.post("/register", async (req, res) => {
    console.log("register called...");
});

router.post("/login", async(req, res) => {
    console.log("login called...");
});

module.exports = router;