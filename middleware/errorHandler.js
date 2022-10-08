const errorHandler = function (err, req, res, next) {
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    success: false,
    message: err.message,
    errorStack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = errorHandler;
