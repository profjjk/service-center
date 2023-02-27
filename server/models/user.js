const { Schema, Types, model } = require('mongoose');

const userSchema = new Schema({
    company: { type: Types.ObjectId, ref: 'Company', required: true },
    username: { type: String, required: [true, 'Username is required'] },
    password: { type: String, required: [true, 'Password required'] },
}, { timestamps: true });

const User = model('User', userSchema);

module.exports = User;
