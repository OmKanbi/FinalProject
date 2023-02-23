const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    waist: Number,
    inseam: Number,
    chest: Number,
    password: String,
    phone: Number,
    role: String
})

mongoose.model('users', UserSchema);
module.exports = mongoose.model('users')