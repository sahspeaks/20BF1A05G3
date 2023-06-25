const mongoose = require("mongoose");
const { Schema } = mongoose;

const TrainSchema = new mongoose.Schema({
    trainName: { type: String },
    trainNumber: { type: String },
    departureTime: {"Hours":{type:String},"Minutes":{type:String},"Seconds":{type:String} },
    ownerName: { type: String, required: true },
    rollNo: { type: String, required: true },
    ownerEmail: { type: String, required: true, unique: true },
    accessCode: { type: String, required: true },
    date: { type: Date, default: Date.now }

});
const Train=mongoose.model('trains', UserSchema);
module.exports = Train;