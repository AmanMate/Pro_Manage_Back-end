const express = require("express");
const router = express.Router();
const authController = require("../controller/userController");
const verifyToken = require("../middlewares/verifyAuth");

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.put("/settings", verifyToken, authController.updateUser);

module.exports = router;