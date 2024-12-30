const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    userName:{
        type: String,
        require:[true, "please add the user name"]
    },
    email:{
        type:String,
        require:[true, "please enter the email address"],
        unique:[true, "Email address already taken "]
    },
    password:{
        type:String,
        require:[true, "enter the password"]
    }
},{
    timestamp:true
});

module.exports = mongoose.model("User", userSchema);