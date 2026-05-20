const express = require("express");
const rateLimit = require("express-rate-limit");
const {
  registerValidation,
  loginValidation,
  register,
  login,
  logout,
  refreshTokens,
  getMe,
  updateMe,
  changePassword,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Stricter rate limit on auth endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 10,
  message: { success: false, message: "Too many attempts. Please try again in 15 minutes." },
  standardHeaders: true,
  legacyHeaders: false,
});

// Public
router.post("/register", authLimiter, registerValidation, register);
router.post("/login", authLimiter, loginValidation, login);
router.post("/logout", logout);
router.post("/refresh-token", refreshTokens);
router.post("/forgot-password", authLimiter, forgotPassword);
router.patch("/reset-password/:token", authLimiter, resetPassword);

// Protected
router.use(protect);
router.get("/me", getMe);
router.patch("/me", updateMe);
router.patch("/change-password", changePassword);

module.exports = router;
