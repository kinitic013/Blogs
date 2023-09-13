const express = require("express")
const mongoose=require("mongoose");
const cors=require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

//database link
const url_local='mongodb://127.0.0.1:27017/blogDb';
// const url_cloud="mongodb+srv://kinitic013:"+process.env.GLOBAL_URL_PASSWORD+"@cluster0.vllksrl.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(url_local)
.then((msg)=>
{    
    console.log("Connected to rest of the world !! ");
})
.catch((err)=>
{
    console.log(err);
    console.log("Connection Failed :<( ");
});

const BlogSchema = new mongoose.Schema(
    {
        _id : String,
        Head : String,
        Body : String,
        Vote : Number, 
        authorId : String
    }
);
const Blogs = new mongoose.model("Blogs",BlogSchema);

app.get('/resetAll',async (req,res)=>
{
    const filter = {};
    const all = await Blogs.find(filter);
    console.log(all);
    res.send(all);
})

app.post('/create',async (req,res)=>
{
    // after checking if user is authorised
    console.log(req.body);

    const newBlog = new Blogs(
        {
            _id : req.body._id,
            Head : req.body.Head,
            Body : req.body.Body,
            Vote : 0,
            authorId  : req.body.authorId
        }
    ) 
    await newBlog.save()
    .then((msg)=>
    {
        console.log("NewBlog added to the Database");
        console.log(msg);

        res.sendStatus(200);
    })
    .catch((err)=>
    {
        if (err.name == 'ValidationError') {
            // below code 
            // field traverse over all elements in schema and prints their feild and error if any
            for (field in err.errors) {
                console.log(field);
                console.log(err.errors[field].message); 
            }
        }
        else
        {
            console.log(err);
        }
        res.sendStatus(400);
    })
})

app.post('/update',async (req,res)=>
{
    console.log(req.body);

    const newBlog = new Blogs(
        {
            _id : req.body._id,
            Head : req.body.Head,
            Body : req.body.Body,
            Vote : req.body.Vote,
            authorId : req.body.authorId
        }
    )
    
    await Blogs.findOneAndUpdate({_id : newBlog._id}, newBlog )
    .then((msg)=>
    {
        console.log("Updated");
        res.sendStatus(200);
    })
    .catch((err)=>
    {
        console.log(err);
        console.log("Error took place");
        res.sendStatus(400);
    })
})

app.post('/delete', async (req,res)=>
{
    console.log(req.body);

    await Blogs.deleteOne({_id : req.body._id})
    .then((msg)=>
    {
        console.log("Deleted");
        console.log(msg);
        res.sendStatus(200);
    })
    .catch((err)=>
    {
        console.log(err);
        res.sendStatus(400);
    })
})














app.listen(5000,()=>
{
    console.log("Server running on Port 5000");
})