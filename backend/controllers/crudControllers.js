const Blogs = require("../models/blog");
const axios = require('axios');

module.exports.create_post = async (req,res)=>
{
    // after checking if user is authorised

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
};


module.exports.update_post = async (req,res)=>
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
};

module.exports.delete_post = async (req,res)=>
{
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
}

module.exports.reset_get = async (req,res)=>
{
    const filter = {};
    const all = await Blogs.find(filter);
    res.send(all);
}