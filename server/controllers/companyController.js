const db = require('../models');

module.exports = {
    findAll: async (req, res) => {
        try {
            const data = await db.Company.find().sort({ createdAt: 1 });
            res.status(200).json(data);
        } catch(err) { res.status(422).json({ msg: err}) }
    },

    findById: async (req, res) => {
        try {
            const data = await db.Company.findById({ _id: req.params.id });
            res.status(200).json(data);
        } catch(err) { res.status(422).json({ msg: err}) }
    },

    create: async (req, res) => {
        try {
            const data = await db.Company.create(req.body);
            res.status(201).res.json(data);
        } catch(err) { res.status(422).json({ msg: err}) }
    },

    update: async (req, res) => {
        try {
            const data = await db.Company.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
            res.status(200).json(data);
        } catch(err) { res.status(422).json(err) }
    },

    delete: async (req, res) => {
        try {
            await db.Company.deleteOne({ _id: req.params.id });
            res.end();
        } catch(err) { res.status(422).json({ msg: err}) }
    }
}
