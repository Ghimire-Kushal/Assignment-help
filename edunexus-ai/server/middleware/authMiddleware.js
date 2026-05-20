const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { AppError } = require("./errorMiddleware");

/**
 * Verify JWT and attach req.user.
 */
async function protect(req, res, next) {
  try {
    let token;

    if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      return next(new AppError("Not authenticated. Please log in.", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select("+isActive");
    if (!user) return next(new AppError("User no longer exists.", 401));
    if (!user.isActive) return next(new AppError("Your account has been deactivated.", 403));

    req.user = user;
    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError") return next(new AppError("Invalid token.", 401));
    if (err.name === "TokenExpiredError") return next(new AppError("Token expired. Please log in again.", 401));
    next(err);
  }
}

/**
 * Restrict access to specific roles.
 * Usage: restrictTo("admin", "expert")
 */
function restrictTo(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user?.role)) {
      return next(new AppError("You do not have permission to perform this action.", 403));
    }
    next();
  };
}

/**
 * Optional auth — attach user if token present, but don't block if absent.
 */
async function optionalAuth(req, res, next) {
  try {
    const token = req.headers.authorization?.startsWith("Bearer ")
      ? req.headers.authorization.split(" ")[1]
      : null;

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (user?.isActive) req.user = user;
    }
  } catch {
    // silently ignore invalid tokens in optional mode
  }
  next();
}

module.exports = { protect, restrictTo, optionalAuth };
