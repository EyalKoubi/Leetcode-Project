const express = require("express");
const {
  registerUser,
  loginUser,
  updateNotifications,
  getUserProfile,
} = require("../controllers/authController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.put("/notifications/:userId", updateNotifications);
authRouter.get("/user/profile", authMiddleware, getUserProfile);

module.exports = authRouter;
