const db = require('../models');

module.exports = {
    create: async (req, res) => {
        try {
            const data = await db.Part.create(req.body);
            res.json(data);
        } catch(err) { res.status(422).json({ msg: err}) }
    },

    findAllByCompanyId: async (req, res) => {
        try {
            const data = await db.Part.find({ company: req.params.id }).sort({ partNumber: 1 });
            res.json(data);
        } catch(err) { res.status(422).json({ msg: err}) }
    },

    findById: async (req, res) => {
        try {
            const data = await db.Part.findById(req.params.id);
            res.json(data);
        } catch(err) { res.status(422).json({ msg: err}) }
    },

    updateById: async (req, res) => {
        try {
            const data = await db.Part.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
            res.json(data);
        } catch(err) { res.status(422).json({ msg: err}) }
    },

    deleteById: async (req, res) => {
        try {
            await db.Part.deleteOne({ _id: req.params.id });
            res.end();
        } catch(err) { res.status(422).json({ msg: err}) }
    }
}
