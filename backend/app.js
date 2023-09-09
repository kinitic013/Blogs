require("dotenv").config();

const express=require("express");
const mongoose=require("mongoose");
const passport= require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const cors=require('cors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());



app.listen(5000,(req,res)=>
{
    console.log("Server running on Port 5000");
})