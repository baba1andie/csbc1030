// middleware/authenticateUser.js
const { findTokenInCookies, getPayload } = require('../services/authService.js');

const authenticateUser = async (req, res, next) => {
    console.log("Entering Middleware...");
    try {
        const token = await findTokenInCookies(req);
        // if (token) {
            const user = await getPayload(token);
            req.user = user;
            next();
        // }
    } catch (error) {
        console.log(error.stack);
        return res.status(401).json({ error: error.message });
    }
    console.log("Leaving Middleware...");
};

module.exports = { authenticateUser };
