const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;

function verifyToken(req, res, next) {
    const token = req.cookies['auth_token'];
    if (token) {
        try {
            const decoded = jwt.verify(token, secretKey);
            req.user = decoded;
        } catch (err) {
            console.log('Invalid Token');
        }
    }
    return next();
}

function getnev(req) {
    const token = req.cookies['auth_token'];
    if (token) {
        try {
            const decoded = jwt.verify(token, secretKey);
            return decoded.nev;
        } catch (err) {
            console.log('Invalid Token');
        }
    }
}

function generateToken(user) {
    return jwt.sign(user, secretKey, { expiresIn: '24h' });
}

module.exports = { verifyToken, getnev, generateToken};