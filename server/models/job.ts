import { Schema, Types, model } from 'mongoose';
import { ICustomer } from './customer';

enum Status {
    'Pending',
    'Scheduled',
    'Completed',
    'Canceled'
}

export interface IJob {
    customer: ICustomer,
    serviceDate?: Date,
    invoiceNumber?: string,
    issueNotes?: string,
    serviceNotes?: string,
    status: Status,
    totalBill?: number,
    isPaid: boolean
}

const jobSchema = new Schema<IJob>({
    customer: { type: Types.ObjectId, ref: 'Customer', required: true },
    serviceDate: { type: Date },
    invoiceNumber: { type: String, index: true },
    issueNotes: String,
    serviceNotes: String,
    status: Status,
    totalBill: { type: Number, default: 0 },
    isPaid: { type: Boolean, default: false }
},{ timestamps: true });

const Job = model<IJob>('Job', jobSchema);

export default Job;