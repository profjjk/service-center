const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../models');
require('dotenv').config();

const authenticateUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const user = await db.User.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: "Invalid credentials." });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ msg: "Invalid credentials." });
        }

        req.user = {
            _id: user._id.toString(),
            company: user.company.toString(),
            email: user.email,
            username: user.username
        };
        next();
    } catch(err) { res.json({ msg: "Failed to authenticate user." }) }
}

const authenticateToken = (req, res, next) => {
    const token = req.headers['service-center'];

    if (!token) return res.status(401).json({ msg: "Access denied. No authorization token received." });

    try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err) => {
            if (err) {
                return res.status(403).json({ msg: err });
            }
            next();
        })
    } catch(err) { res.json({ msg: "Failed to authenticate token." }) }
}

module.exports = {
    token: authenticateToken,
    user: authenticateUser
}
