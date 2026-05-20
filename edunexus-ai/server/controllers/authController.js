const crypto = require("crypto");
const { body } = require("express-validator");
const User = require("../models/User");
const { AppError } = require("../middleware/errorMiddleware");
const { validate } = require("../middleware/validateMiddleware");
const { sendTokenResponse, verifyRefreshToken, signAccessToken } = require("../utils/jwt");
const catchAsync = require("../utils/catchAsync");

// ─── Validation chains ────────────────────────────────────────────────────────

const registerValidation = [
  body("name").trim().notEmpty().withMessage("Name is required.").isLength({ min: 2, max: 80 }),
  body("email").trim().isEmail().withMessage("Enter a valid email.").normalizeEmail(),
  body("password").isLength({ min: 8 }).withMessage("Password must be at least 8 characters."),
  body("role").optional().isIn(["student", "admin"]).withMessage("Invalid role."),
  validate,
];

const loginValidation = [
  body("email").trim().isEmail().withMessage("Enter a valid email.").normalizeEmail(),
  body("password").notEmpty().withMessage("Password is required."),
  validate,
];

// ─── Controllers ──────────────────────────────────────────────────────────────

const register = catchAsync(async (req, res, next) => {
  const { name, email, password, role = "student", university, country, phone } = req.body;

  const existing = await User.findOne({ email });
  if (existing) return next(new AppError("Email already registered.", 409));

  const user = await User.create({ name, email, password, role, university, country, phone });

  // TODO: send verification email in production

  sendTokenResponse(user, 201, res);
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password +isActive");
  if (!user || !(await user.comparePassword(password))) {
    return next(new AppError("Invalid email or password.", 401));
  }
  if (!user.isActive) return next(new AppError("Your account has been deactivated.", 403));

  user.lastLoginAt = new Date();
  await user.save({ validateBeforeSave: false });

  sendTokenResponse(user, 200, res);
});

const logout = catchAsync(async (req, res) => {
  res.clearCookie("refreshToken");
  res.status(200).json({ success: true, message: "Logged out successfully." });
});

const refreshTokens = catchAsync(async (req, res, next) => {
  const token = req.cookies?.refreshToken ?? req.body?.refreshToken;
  if (!token) return next(new AppError("No refresh token provided.", 401));

  const decoded = verifyRefreshToken(token);
  const user = await User.findById(decoded.id);
  if (!user || !user.isActive) return next(new AppError("Invalid refresh token.", 401));

  const accessToken = signAccessToken(user._id, user.role);
  res.status(200).json({ success: true, accessToken });
});

const getMe = catchAsync(async (req, res) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ success: true, user: user.toSafeObject() });
});

const updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.role) {
    return next(new AppError("Use /change-password to update your password.", 400));
  }

  const allowed = ["name", "phone", "university", "country"];
  const updates = Object.fromEntries(
    Object.entries(req.body).filter(([k]) => allowed.includes(k))
  );

  const user = await User.findByIdAndUpdate(req.user.id, updates, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({ success: true, user: user.toSafeObject() });
});

const changePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return next(new AppError("Provide currentPassword and newPassword.", 400));
  }
  if (newPassword.length < 8) {
    return next(new AppError("New password must be at least 8 characters.", 400));
  }

  const user = await User.findById(req.user.id).select("+password");
  if (!(await user.comparePassword(currentPassword))) {
    return next(new AppError("Current password is incorrect.", 401));
  }

  user.password = newPassword;
  await user.save();

  sendTokenResponse(user, 200, res);
});

const forgotPassword = catchAsync(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  // Always respond the same to prevent user enumeration
  const msg = "If that email exists, a reset link has been sent.";
  if (!user) return res.status(200).json({ success: true, message: msg });

  const resetToken = crypto.randomBytes(32).toString("hex");
  user.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  user.passwordResetExpires = new Date(Date.now() + 30 * 60 * 1000); // 30 min
  await user.save({ validateBeforeSave: false });

  // TODO: send email with resetToken in production

  res.status(200).json({ success: true, message: msg });
});

const resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  }).select("+passwordResetToken +passwordResetExpires");

  if (!user) return next(new AppError("Token is invalid or has expired.", 400));

  const { newPassword } = req.body;
  if (!newPassword || newPassword.length < 8) {
    return next(new AppError("New password must be at least 8 characters.", 400));
  }

  user.password = newPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  sendTokenResponse(user, 200, res);
});

module.exports = {
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
};
