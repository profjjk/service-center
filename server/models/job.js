const { Schema, Types, model } = require('mongoose');

const jobSchema = new Schema({
    company: { type: Types.ObjectId, ref: 'Company', required: true },
    customer: { type: Types.ObjectId, ref: 'Customer', required: true },
    serviceDate: { type: Date },
    invoiceNumber: { type: String, index: true },
    issueNotes: String,
    serviceNotes: String,
    status: {
        type: String,
        enum: ['Pending', 'Scheduled', 'Completed', 'Canceled'],
        default: 'Pending'
    },
    totalBill: { type: Number, default: 0 },
    isPaid: { type: Boolean, default: false }
}, { timestamps: true });

const Job = model('Job', jobSchema);

module.exports = Job;
