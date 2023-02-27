const { Schema, Types, model } = require('mongoose');

const companySchema = new Schema({
    companyName: { type: String, required: [true, 'Company name is required'] },
    users: { type: [Types.ObjectId], ref: 'User' }
}, { timestamps: true });

const Company = model('Company', companySchema);

module.exports = Company;