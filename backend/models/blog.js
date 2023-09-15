const mongoose=require("mongoose");
const Schema = mongoose.Schema;

const BlogSchema = new Schema(
    {
        _id : String,
        Head : String,
        Body : String,
        Vote : Number, 
        authorId : String
    }
);

module.exports = mongoose.model("Blogs",BlogSchema);