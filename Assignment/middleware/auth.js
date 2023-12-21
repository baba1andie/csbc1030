 const jwt = require("jsonwebtoken");
 const SECRET_KEY = "2fd45a9c8b1e6f37d0a4c8e5b2f971d4a6bc3e188f67c92a3e87bf3a8c6d195d";

 function authenticateToken(req, res, next) {
    const token = req.headers.authorization;
  
    if(!token){
      res.status(401).json({error:"Token not provided"})
    }
    try {
      const decoded = jwt.verify(token.split(" ")[1], SECRET_KEY)
      req.user = decoded.user
      next()
    } catch (error) {
      return res.status(401).json({error:"Unauthorised - Invalid Token"})
    }
  
  }

  function authorizeUser(req, res, next) {
    const userId = parseInt(req.params.id)
  
    if (req.user.id !== userId) {
      return res.status(403).json({ error: "Forbidden - You are not authorized to access this resource!" });
    }
  
    next();
  }

module.exports = {
  authenticateToken,
  authorizeUser,
};
