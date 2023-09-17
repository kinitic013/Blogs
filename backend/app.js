require('dotenv').config()

const express = require("express")
const mongoose=require("mongoose");
const cors=require("cors");
const authRoutes = require("./routes/authRoutes");
const crudRoutes = require("./routes/crudRoutes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

const url_local='mongodb://127.0.0.1:27017/blogDb';
const atlas_url=`mongodb+srv://kinitic013:${process.env.GLOBAL_URL_PASSWORD}@cluster0.vllksrl.mongodb.net/?retryWrites=true&w=majority`;
mongoose
  .connect(atlas_url)
  .then((msg) => {
    console.log("Connected to rest of the world !! ");
  })
  .catch((err) => {
    console.log(err);
    console.log("Connection Failed :<( ");
  });
app.use(crudRoutes);
app.use(authRoutes);

app.listen(5000,()=>
{
    console.log("Server running on Port 5000");
})