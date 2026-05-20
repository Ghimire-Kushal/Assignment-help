/**
 * Wraps an async controller so unhandled rejections flow to next(err).
 */
function catchAsync(fn) {
  return (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
}

module.exports = catchAsync;
