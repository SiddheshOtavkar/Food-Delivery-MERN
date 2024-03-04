const express = require("express");
const registerController = require("../controllers/authController");
const loginController = require("../controllers/authController");

// Router object
const router = express.Router();

// Routing
// REGISTER(Signup) || METHOD POST
router.post("/signup", registerController);

//LOGIN || POST
router.post("/login", loginController);

module.exports = router;