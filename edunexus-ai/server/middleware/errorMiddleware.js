/**
 * Custom application error class.
 * Pass an HTTP status code alongside the message.
 */
class AppError extends Error {
  constructor(message, statusCode = 500, errors = null) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode < 500 ? "fail" : "error";
    this.isOperational = true;
    this.errors = errors; // optional field-level validation errors
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Catch-all 404 handler — attach after all routes.
 */
function notFound(req, res, next) {
  next(new AppError(`Route ${req.method} ${req.originalUrl} not found.`, 404));
}

/**
 * Central error handler — attach last.
 */
function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  let { statusCode = 500, message, errors } = err;

  // Mongoose: CastError (invalid ObjectId)
  if (err.name === "CastError") {
    statusCode = 400;
    message = `Invalid value for field '${err.path}': ${err.value}`;
  }

  // Mongoose: duplicate key
  if (err.code === 11000) {
    statusCode = 409;
    const field = Object.keys(err.keyValue ?? {})[0] ?? "field";
    message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists.`;
  }

  // Mongoose: validation errors
  if (err.name === "ValidationError") {
    statusCode = 422;
    message = "Validation failed.";
    errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") { statusCode = 401; message = "Invalid token."; }
  if (err.name === "TokenExpiredError") { statusCode = 401; message = "Token expired."; }

  // Multer errors
  if (err.code === "LIMIT_FILE_SIZE") { statusCode = 413; message = "File is too large."; }
  if (err.code === "LIMIT_UNEXPECTED_FILE") { statusCode = 400; message = "Unexpected file field."; }

  const isDev = process.env.NODE_ENV === "development";

  res.status(statusCode).json({
    success: false,
    status: err.status ?? (statusCode >= 500 ? "error" : "fail"),
    message,
    ...(errors && { errors }),
    ...(isDev && { stack: err.stack }),
  });
}

module.exports = { AppError, notFound, errorHandler };
