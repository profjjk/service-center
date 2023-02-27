const { Schema, Types , model} = require('mongoose');

const customerSchema = new Schema({
    company: { type: Types.ObjectId, ref: 'Company', required: true },
    businessName: { type: String, required: [true, 'Business name required'], index: true },
    contactName: String,
    phone: {
        type: String,
        match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
        required: [true, 'Phone # required']
    },
    address: {
        street1: String,
        street2: String,
        city: String,
        state: { type: String, maxLength: 2, default: 'CA' },
        zipcode: String
    },
    notes: String
}, { timestamps: true });

const Customer = model('Customer', customerSchema);

module.exports = Customer;
