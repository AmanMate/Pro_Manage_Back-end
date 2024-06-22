const express = require("express");
const router = express.Router();
const authController = require("../controller/userController");

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.put("/settings", authController.updateUser);

module.exports = router;