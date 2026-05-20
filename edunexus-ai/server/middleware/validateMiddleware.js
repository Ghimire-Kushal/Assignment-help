const { validationResult } = require("express-validator");
const { AppError } = require("./errorMiddleware");

/**
 * Run after express-validator chains.
 * If there are errors, immediately respond with 422 + field details.
 */
function validate(req, res, next) {
  const result = validationResult(req);
  if (result.isEmpty()) return next();

  const errors = result.array().map((e) => ({
    field: e.path ?? e.param,
    message: e.msg,
  }));

  return next(new AppError("Validation failed.", 422, errors));
}

module.exports = { validate };
