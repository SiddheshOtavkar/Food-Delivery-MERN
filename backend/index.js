const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const colors = require("colors");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoute");

app.use(cors());
app.use(express.json({ limit: "10mb" }));

//Config env
dotenv.config({ path: "configenv/.env" });
const PORT = process.env.PORT || 5000;

// database
connectDB();

//rest api
app.get("/", (req, res) => {
    res.send("Server is running");
});

// routes
// app.use("/auth", authRoutes);
app.use("/auth", authRoutes);

app.listen(PORT, () => {
    console.log(`Server Running on ${process.env.DEV_MODE} mode on ${PORT}`.bgWhite.black);
});