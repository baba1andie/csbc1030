const { findTokenInCookie } = require("../services/authService.js");

const authFilter = async (req, res, next) => {
  console.time("Request");
  console.log(`METHOD: ${req.method}; URL: ${req.url}}`);

  try {
    await findTokenInCookie(req);
    next();
  } catch (err) {
    console.log("No Token");
    return res.status(401).send(err.message);
  }
  console.timeEnd("Request");
};

const badRequest = async (req, res) => {
  return res.status(500).send("Bad Request");
};

module.exports = { authFilter, badRequest };
