const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    businessName: { type: String, required: [true, 'Business name required'], index: true },
    contactName: String,
    phone: { type: String, required: [true, 'Phone # required'] },
    address: {
        street1: String,
        street2: String,
        city: String,
        state: { type: String, default: 'CA' },
        zipcode: String
    },
    notes: String
}, { timestamps: true });

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
