const errorHandler = (err, req, res, next) => {
  console.error('[Pathfolio API Error]:', err);

  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  
  res.status(statusCode).json({
    error: err.message || 'An unexpected server error occurred.',
    status: statusCode
  });
};

module.exports = errorHandler;
