const db = require('../models');
const bcrypt = require('bcrypt');

module.exports = {
    findAll: async (req, res) => {
        try {
            const data = await db.User.find().select('-password').sort({ createdAt: 1 });
            res.status(200).json(data);
        } catch(err) { res.status(422).json({ msg: err}) }
    },

    findById: async (req, res) => {
        try {
            const data = await db.User.findById({ _id: req.params.id }).select(['-password', '-createdAt', '-updatedAt']);
            res.status(200).json(data);
        } catch(err) { res.status(422).json({ msg: err }) }
    },

    create: async (req, res) => {
        const { company, email, username, password } = req.body;
        try {
            const newUser = await db.User.create({
                company,
                email,
                username,
                "password": await bcrypt.hash(password, 10)
            });
            res.status(201).res.json(newUser);
        } catch(err) { res.status(422).json({ msg: err }) }
    },

    update: async (req, res) => {
        try {
            const data = await db.User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
            res.status(200).json(data);
        } catch(err) { res.status(422).json({ msg: err }) }
    },

    delete: async (req, res) => {
        try {
            await db.User.deleteOne({ _id: req.params.id });
            res.end();
        } catch(err) { res.status(422).json({ msg: err }) }
    }
}
