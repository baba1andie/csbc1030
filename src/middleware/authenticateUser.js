// middleware/authenticateUser.js
const jwt = require('jsonwebtoken');
const { User } = require('../models/userModel');

const authenticateUser = async (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    try {
        const decoded = jwt.verify(token, 'your-secret-key');
        const user = await User.findByPk(decoded.userId);

        if (!user) {
            throw new Error('User not found');
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Error in authentication middleware:', error);

        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Unauthorized: Token expired' });
        }

        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    
    }
};

module.exports = authenticateUser;
