const express=require("express");
const bodyParser=require("body-parser");
const ejs=require("ejs");
const customSort= require(__dirname + "/functions/sort.js");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//database link

const mongoose=require("mongoose");
const { required } = require("nodemon/lib/config");
const url="mongodb://localhost:27017/BlogDB";
mongoose.connect(url);


const BlogSchema= new mongoose.Schema(
    {
        Head : String,
        Body : String,
        Vote : Number
    }
)
const Blogs= new mongoose.model("Blogs", BlogSchema);

app.get('/',(req,res)=>
{
    const defaultpara= "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    Blogs.find({})
    .then((items)=>
    {
        items=customSort(items);
        res.render("home",{defaultpara : defaultpara , Blogs : items});
    })
    .catch((err)=>
    {
        res.send(err);
    })
    
});
app.get("/home",(req,res)=>
{
    res.redirect('/');
})
app.get('/contact',(req,res)=>
{
    const defaultpara= "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    res.render("contact",{defaultpara : defaultpara , Blogs : Blogs});
});
app.get('/custom',(req,res)=>
{
    res.render("custom");
});
app.get('/Admin',(req,res)=>
{
    Blogs.find({})
    .then((items)=>
    {
        items=customSort(items);
        res.render("admin",{Blogs : items});
    })
    .catch((err)=>
    {
        res.write("SOME EORROR TOOK PLAC :<{");
    })
})

app.post('/',(req,res)=>
{
    let NewItem= new Blogs(
        {
            Head : req.body.Head,
            Body : req.body.NewBlog,
            Vote : 0
        }
    ) 
    NewItem.save()
    .then((msg)=>
    {
        console.log(msg);
        console.log("New Blog added Successfully!!")
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
    })
    console.log(Blogs[Blogs.length-1]);
    res.redirect('/');
})
app.post("/up",(req,res)=>
{

    Blogs.updateOne({Head : req.body.Head , Body : req.body.Body }, {Vote : Number(req.body.Vote) + 1})
    .then((msg)=>
    {
        console.log("Upvoted !!");
    })
    .catch((err)=>
    {
        console.log("Error took place :<(");
        console.log((err));
    })
    res.redirect('/home');
})
app.post("/down",(req,res)=>
{
    Blogs.updateOne({Head : req.body.Head , Body : req.body.Body }, {Vote : Number(req.body.Vote) - 1})
    .then((msg)=>
    {
        console.log("DownVoted !!");
    })
    .catch((err)=>
    {
        console.log("Error took place :<(");
        console.log((err));
    })
    res.redirect('/home');
})
app.post('/Admin',(req,res)=>
{
    Blogs.deleteOne({Head : req.body.Head})
    .then((msg)=>
    {
        console.log(msg);
    })
    .catch((err)=>
    {
        console.log(err);
    })
    res.redirect('/Admin');
})

app.listen(3000,(req,res)=>
{
    console.log("Server running on port 3000");
})



