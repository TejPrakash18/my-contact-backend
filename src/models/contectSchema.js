const mongoose = require("mongoose");

const contectSchema = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        require:true,
        ref: "User"
    },
    name:{
        type: String,
        require:[true, "please add the user name"]
    },
    email:{
        type:String,
        require:[true, "please enter the email address"]
    },
    phone:{
        type:String,
        require:[true, "please add the contact phone number"]
    }
},{
    timestamp:true
});

module.exports = mongoose.model("Contact", contectSchema);