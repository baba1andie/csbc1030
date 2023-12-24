const jwt = require('jsonwebtoken');

const findTokenInCookies = async (req) => {
    const token = await req.cookies["auth-tk"];
    if (!token) {
        throw new Error('Unauthorized: No token provided');
    } else {
        return token;
    }
}

const getPayload = async(token) => {
    const isVerifiedUser = await verifyUser(token);
    if (!isVerifiedUser) {
        throw new Error('Unauthorized: No token provided');
    }
    const decoded = await jwt.decode(token, { complete: true });
    const user = decoded.payload;
    return user;
}

const verifyUser = async(token) => {
    const isVerifiedUser = await jwt.verify(token, 'DoNOTDIsturb'); // env.TOKEN_SECRET => which is the seceret key for jwt
    return isVerifiedUser;
}

module.exports = { findTokenInCookies, getPayload };