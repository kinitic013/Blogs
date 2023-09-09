const express= require("express");
const cors=require('cors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());


app.get("/",(req,res)=>
{
    console.log("Step 1");
    res.send("ok");
})

app.post("/",(req,res)=>
{
    console.log("Step 1");
    console.log(req.body);
    console.log("Step 2");
    res.send("ok");
})

app.listen(5000,(req,res)=>
{
    console.log("Server running on port 5000");
})



