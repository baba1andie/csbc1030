
const secret = "09f26e402586e2faa8da4c98a35f1b20d6b033c6097befa8be3486a829587fe2f90a832bd3ff9d42710a4da095a2ce285b009f0c3730cd9b8e1af3eb84df6611";

import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    if (authHeader == null) return res.sendStatus(401);

    jwt.verify(authHeader.toString().substring(7), secret, (err, user) => {
        if (err) return res.sendStatus(403);

        req.user = user;
        next();
    });
};

const generateAccessToken = (userId) => {
    console.log(userId);
    const signedToken = jwt.sign({"data":userId}, secret, {expiresIn: "1800s"});

    return signedToken;
};

export {authenticateToken, generateAccessToken};