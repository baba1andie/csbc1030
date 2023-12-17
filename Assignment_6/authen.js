const jwt = require('jsonwebtoken');
require('dotenv').config();

const { secretKey } =process.env.SECRET_KEY;//require('./config'); // You'll need to define your secretKey
console.log('Secret Key:', process.env.SECRET_KEY);
function auth(req, res, next) {
  const token = req.headers.authorization;
  console.log(token);
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized!!' });
  }

  try {
    console.log("try");
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(401).json({ error: 'Unauthorized - Invalid token'});
  }
}

module.exports = auth;
function authorize(userID) {
    return (req, res, next) => {
      if (req.user.id === userID) {
        next();
      } else {
        return res.status(403).json({ error: 'You are not authorized!!!' });
      }
    };
  }
  
  module.exports = { auth, authorize }