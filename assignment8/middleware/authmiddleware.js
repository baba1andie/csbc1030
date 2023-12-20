const jwt = require('jsonwebtoken');

function customAuthentication(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Access Denied: No token provided' });
  }

  jwt.verify(token, 'new_secret_key', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Forbidden: Invalid token' });
    }
    req.user = user;
    next();
  });
}

module.exports = customAuthentication;