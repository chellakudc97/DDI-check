// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    type: { type: String, required: true, enum: ['physician', 'patient'] },
    gender: { type: String, required: true, enum: ['male', 'female'] },
    birthdate: { type: Date, required: true },
    SVNR: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    assignedPhysicians: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Only for patients
    drugs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Drug' }] // Only for patients
});

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
