require("dotenv").config();

const express=require("express");
const customSort= require(__dirname + "/functions/sort.js");
const mongoose=require("mongoose");
const { required } = require("nodemon/lib/config");
const session = require('express-session')
const passport= require('passport');
const passportLocalMongoose = require('passport-local-mongoose');
const cors=require('cors');

// console.log(process.env.GLOBAL_URL_PASSWORD);
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    
    // cookie: { secure: true }
  }));
app.use(passport.initialize())
app.use(passport.session());




//database link
const url_local="mongodb://localhost:27017/blogDB";
const url_cloud="mongodb+srv://kinitic013:"+process.env.GLOBAL_URL_PASSWORD+"@cluster0.vllksrl.mongodb.net/?retryWrites=true&w=majority"
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



const BlogSchema= new mongoose.Schema(
    {
        Head : String,
        Body : String,
        Vote : Number,
        authorId : String
    }
)

const userSchema= new mongoose.Schema(
    {
        username : String,
        password : String,
        googleId : String,
        name     : String,
        myblog  : [
            {
                BlogId : String
            }
        ]
    }
)

userSchema.plugin(passportLocalMongoose);

const Blogs= new mongoose.model("Blogs", BlogSchema);
const account = new mongoose.model("account",userSchema);

passport.use(account.createStrategy());// internally implemented Localstrategy go checkout passport local mongoose repo for more

passport.serializeUser(function(user, done) {
    done(null, user);
});   
passport.deserializeUser(function(user, done) {
    done(null, user);
});
///////////////////////get request//////////////////////////
app.get('/',async (req,res)=>
{
    res.redirect('/home');
});

app.get("/home",async (req,res)=>
{
    const defaultpara= "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    await  Blogs.find({})
    .then(async(items)=>
    {
        items= await customSort(items);
        res.render("home", {defaultpara : defaultpara , Blogs : items});
    })
    .catch((err)=>
    {
        res.send(err);
    })
})
app.get('/contact',(req,res)=>
{
    const defaultpara= "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    res.render("contact",{defaultpara : defaultpara , Blogs : Blogs});
});
app.get('/custom',(req,res)=>
{
    if(req.isAuthenticated())
    {
        console.log(req.body.user);
        // console.log(req.body.user._id);
        console.log(req.user.name);
        res.render("custom",{accountName : req.user.name});
    }
    else
    {
        res.redirect('/login');
    }
});

app.get('/login',(req,res)=>
{
    res.render("login");
})
app.get('/register',(req,res)=>
{
    // res.send("ok");
    res.render("register");
})


//////////////////post request //////////////////////////////////


app.post('/custom',async (req,res)=>
{
    console.log("Reached");

    const val=req.user._id;
    console.log("Step 1 Post");
    console.log(req.body);
    console.log("Step 1.1 Post");
    
    let NewItem= new Blogs(
        {
            Head : req.body.Head,
            Body : req.body.NewBlog,
            Vote : 0,
            authorId  : req.user._id
        }
    ) 
    await NewItem.save()
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
    let temp=req.user.myblog;
    temp.push({
        BlogId : NewItem._id
    });
    console.log(temp);
    account.findOneAndUpdate({_id : req.user._id},{myblog : temp})
    .then((msg)=>
    {
        console.log(msg);
        console.log("Updated!!");
    })
    .catch((err)=>
    {
        console.log(err);
        console.log("Error took place :<( ");
    })
    res.redirect('/home');
})


app.post("/login", passport.authenticate('local', { failureRedirect: '/login' }),(req, res)=> {
    res.redirect('/custom');
});
app.post('/register',(req,res)=>
{
    console.log("reached");
    console.log(req.body);
    const username = req.body.username;
    const name= req.body.name;
    const password = req.body.password;
    account.register({username : username, name : name, mybog : []}, password,(err,user)=>
    {
        if(err)
        {
            console.log(err);
            res.send(err);
        }
        console.log('user registered!');
    })
    res.send("OK");
})

//Miscellaneous Requests

app.post("/up",async (req,res)=>
{

    await Blogs.updateOne({Head : req.body.Head , Body : req.body.Body }, {Vote : Number(req.body.Vote) + 1})
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
app.post("/down",async(req,res)=>
{
    await Blogs.updateOne({Head : req.body.Head , Body : req.body.Body }, {Vote : Number(req.body.Vote) - 1})
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

//////////////////// Secret profile page///////////////////////////

app.get("/profile/:name",async (req,res)=>
{
    let myblogs=[]; 
    await account.findOne({name : req.params.name})
    .then(async(user)=>
    {
        for(var i=0;i<user.myblog.length;i++)
        {
            await Blogs.findOne({ _id : user.myblog[i].BlogId})
            .then((blog)=>
            {
                if(blog)
                {
                    myblogs.push(blog);
                }
                else
                {
                    console.log("Blog not Found !! ");
                }
            })
            .catch((err)=>
            {
                console.log((err));
                console.log("Can't find one");
            })
        }
    })
    .catch((err)=>
    {
        console.log(err);
        console.log("Can't find array");
    })

    res.render("profile",{accountName : req.params.name , myBlogs : myblogs});
})

app.post('/Admin/profile',async (req,res)=>
{
    const author=req.body.authorid;
    await Blogs.deleteOne({_id : req.body.id})
    .then((msg)=>
    {
        console.log(msg);
    })
    .catch((err)=>
    {
        console.log(err);
    })
    await account.findOne({_id : author})
    .then(async (user)=>
    {
        let temp= user.myblog;
        for(let i=0;i<temp.length;i++)
        {
            if(temp[i].BlogId===req.body.id)
            {
                temp.splice(i,1);
                await account.updateOne({_id : author}, { myblog : temp})
                break;
            }
        }


        res.redirect(`/profile/${user.name}`);
    })
    
})

/////////////////////////////// Admin Backdoor //////////////////////////////////////////

app.route("/Admin")
.get(async(req,res)=>
{
    await Blogs.find({})
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
.post(async (req,res)=>
{
    await Blogs.deleteOne({Head : req.body.Head})
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

app.get('/systemTesting',(req,res)=>
{
    console.log("reached");
    const data={
        Hell0 : "World"
    }
    res.json(data);
})
app.listen(5000,(req,res)=>
{
    console.log("Server running on port 5000");
})



