const mongoose=require("mongoose");
const Schema = mongoose.Schema;

const userSchema= new Schema(
    {
        _id : String,
        Email : String,
        Password : String,
    }
)

module.exports = mongoose.model("Accounts",userSchema);