const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports = {
    register: async (req, res) => {
        const { companyName, email, username, password } = req.body;
        try {
            const newCompany = await db.Company.create({ companyName });
            const newUser = await db.User.create({
                "company": newCompany._id,
                email,
                username,
                "password": await bcrypt.hash(password, 10)
            });
            res.status(201).res.json({ newCompany, newUser });
        } catch(err) { res.status(422).json({ msg: err }) }
    },

    login: async (req, res) => {
        const user = req.user;
        try {
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '24 hours' });
            res.status(201).json({ user, token: token });
        } catch(err) { res.status(422).json({ msg: err }) }
    },
}