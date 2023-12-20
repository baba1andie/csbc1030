function errorHandler(err, req, res, next) {
    console.error(err.stack);
  
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      return res.status(400).json({ error: 'Bad request: Invalid JSON' });
    }

    res.status(500).json({ error: 'Internal Server Error' });
  }
  
  module.exports = errorHandler;
  