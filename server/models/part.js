const { Schema, Types, model } = require('mongoose');

const partSchema = new Schema({
    company: { type: Types.ObjectId, ref: 'Company', required: true },
    partNumber: { type: String, required: [true, 'Part # required'], index: true },
    description: { type: String, required: [true, 'Description required'] },
    stock: { type: Number, default: 0 },
    minimum: { type: Number, default: 0 }
}, { timestamps: true });

const Part = model('Part', partSchema);

module.exports = Part;
