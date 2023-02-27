import { Schema, model } from 'mongoose';

export interface IAddress {
    street1?: string,
    street2?: string,
    city?: string,
    state?: string,
    zipcode?: string
}

export interface ICustomer {
    businessName: string,
    contactName?: string,
    phone: number,
    address: IAddress,
    notes?: string
}

const customerSchema = new Schema<ICustomer>({
    businessName: { type: String, required: [true, 'Business name required'], index: true },
    contactName: String,
    phone: { type: Number, required: [true, 'Phone # required'] },
    address: {
        street1: String,
        street2: String,
        city: String,
        state: String,
        zipcode: String
    },
    notes: String
}, { timestamps: true });

const Customer = model<ICustomer>('Customer', customerSchema);

export default Customer;