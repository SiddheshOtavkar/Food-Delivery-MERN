const express = require("express");
const router = express.Router();
const {
    registerController,
    loginController,
} = require("../controllers/authController");

// REGISTER(Signup) || METHOD POST
router.post("/register", registerController);

// LOGIN || POST
router.post("/login", loginController);

module.exports = router;
