const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (user) => {
  const payload = {
    id: user.id,
    email: user.email,
  };
  const token = jwt.sign(payload, process.env.TOKEN_SECRET);
  return token;
};

const idFromTokenPayload = (token) => {
  // Decode the token
  const decoded = jwt.decode(token, { complete: true });
  // Access the payload
  const payload = decoded.payload;
  return payload.id;
};

const findTokenInCookie = async (req) => {
  const token = await req.cookies["auth-token"];
  if (!token) {
    throw new Error("Access Denied - Token Unavailable/Empty in Header");
  } else {
    return token;
  }
};

module.exports = { generateToken, idFromTokenPayload, findTokenInCookie };
