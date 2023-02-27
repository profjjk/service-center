const { Schema, model } = require('mongoose');

const companySchema = new Schema({
    companyName: { type: String, required: [true, 'Company name is required'] },
}, { timestamps: true });

const Company = model('Company', companySchema);

module.exports = Company;