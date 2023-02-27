import { Schema, Types, model } from 'mongoose';
import { IOrganization } from './organization';

enum Permission {
    'Admin',
    'Member'
}

export interface IUser {
    username: string,
    password: string,
    organization: IOrganization,
    permission: Permission
}

const userSchema = new Schema<IUser>({
    username: { type: String, required: [true, 'Username is required'] },
    password: { type: String, required: [true, 'Password required'] },
    organization: { type: Types.ObjectId, ref: 'Organization', required: true },
    permission: Permission
},{ timestamps: true });

const User = model<IUser>('User', userSchema);

export default User;

