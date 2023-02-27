import { Schema, Types, model } from 'mongoose';
import { IUser } from './user';

export interface IOrganization {
    name: string,
    users: IUser[],
}

const organizationSchema = new Schema<IOrganization>({
    name: { type: String, required: [true, 'Organization name is required']},
    users: { type: [Types.ObjectId], ref: 'User'}
},{ timestamps: true });

const Organization = model<IOrganization>('Organization', organizationSchema);

export default Organization;