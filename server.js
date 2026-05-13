/**
 * Autentisering och inloggning
 */

const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());

// mongoDB
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Ansluten till MongoDB!");
    })
    .catch((err) => {
        console.error("Kunde inte ansluta till databasen:", err);
    });

// routes
app.use("/api", authRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
});