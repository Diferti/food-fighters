const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/config');
const User = require('../models/userModel');

const authenticateJWT = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user
            req.getUser = async () => {
                return await User.findById(user.id);
            };
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = authenticateJWT;