const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    ownerName: { type: String, required: true },
    rollNo: { type: String, required: true },
    ownerEmail: { type: String, required: true, unique: true },
    accessCode: { type: String, required: true },
    date: { type: Date, default: Date.now }

});
const User=mongoose.model('user', UserSchema);
module.exports = User;