const express = require("express");
const app = express();
const connectMongo=require('./db');

const cors=require('cors');
require('dotenv').config();
app.use(cors());

connectMongo();

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Hello World");
});

app.use('/train',require('./routes/auth'));


let port=process.env.PORT;
if(port==null || port==""){
  port=5000;
}
app.listen(port, () => {
  console.log("Server started at port 5000");
});