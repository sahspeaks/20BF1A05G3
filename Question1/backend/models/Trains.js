const mongoose = require("mongoose");
const { Schema } = mongoose;

const TrainSchema = new mongoose.Schema({
    companyName: { type: String, required: true },
    clientID: { type: String, required: true },
    clientSecret: { type: String, required: true },
    ownerName: { type: String, required: true },
    rollNo: { type: String, required: true },
    ownerEmail: { type: String, required: true, unique: true },
    accessCode: { type: String, required: true },
    date: { type: Date, default: Date.now }

});
const Train=mongoose.model('trains', UserSchema);
module.exports = Train;