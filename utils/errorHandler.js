const handleError = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
  
    console.error(err);
  
    const errorMessage = statusCode === 500 ? "Internal Server Error" : err.message;
  
    res.status(statusCode).json({ message: errorMessage });
  };
  
  const createCustomError = (statusCode, message) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
  };
  
  module.exports = {
    handleError,
    createCustomError,
  };