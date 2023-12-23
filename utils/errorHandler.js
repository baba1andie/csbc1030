const errorHandler = (err, req, res, next) => {
  // Determine the status code: if the error has a specified status, use it; otherwise, use 500
  const statusCode = err.statusCode || 500;

  // Log the error for server-side debugging
  console.error(err);

  // Send a generic message if it's a server error (status 500)
  if (statusCode === 500) {
    return res.status(statusCode).json({ message: "Internal Server Error" });
  }

  // For other types of errors, send the error message
  res.status(statusCode).json({ message: err.message });
};

// Function to create and throw a new error with a status code
const createError = (statusCode, message) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

module.exports = {
  errorHandler,
  createError,
};
