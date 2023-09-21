const Accounts = require("../models/account");
const axios = require('axios');
const bcrypt = require('bcrypt');

const saltRounds = 10;

module.exports.signup_post = (req,res) => {
    const plainPassword = req.body.Password;
    bcrypt.hash(plainPassword , saltRounds, function(err, hash) {

        if(err)
        {
            console.log(err);
            res.sendStatus(400).send("Error in Hashing ");
        }

        const newUser = new Accounts(
            {
                _id : req.body._id,
                Email : req.body.Email,
                Password : hash,
            }
        )
    
        newUser.save()
        .then((msg)=>{
            res.json(JSON.stringify({Email : newUser.Email , _id : newUser._id}));
        })
        .catch((err)=>{console.log(err); res.sendStatus(400)})
    });


}

module.exports.login_post = async (req,res) => {
    const userEmail = req.body.Email;
    const userPlainPassword = req.body.Password;

    await Accounts.findOne({Email : userEmail})
    .then((user)=>
    {
        console.log(user);
        if(user)
        {
            const match = bcrypt.compare(userPlainPassword, user.Password, async function(err, result) {
                if(err)
                {
                    console.log(err);
                    res.sendStatus(400);
                }
                else if(result === true) //user Logged in
                res.json(JSON.stringify({Email : user.Email , _id : user._id}));
                else if(result === false) // incorrect email or password
                res.sendStatus(400).send("Incorrect Email/Password");

            });
        }
        else
        res.sendStatus(400).send("User Not Found");//user not found// redirect to login to popup incorrect password /email
    })
    .catch((err)=>
    {
        console.log(err);
        res.sendStatus(400);
    })
}

module.exports.logout_post = (req,res) => {
    console.log("logout");
    res.send("Logout");
}
