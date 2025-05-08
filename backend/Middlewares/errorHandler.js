module.exports = (err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong ..";

  console.log(`[ERROR] ${status} - ${message}`);

  return res.status(status).json({
    success: false,
    error: message,
  });
};
