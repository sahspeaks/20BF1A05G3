const mongoose = require("mongoose");

const connectMongo=()=>{
    mongoose.connect("mongodb://localhost:27017/TrainDB");
}
module.exports=connectMongo;