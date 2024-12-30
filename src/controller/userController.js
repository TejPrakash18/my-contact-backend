const User = require("../models/userSchema")
const bcyrpt= require("bcrypt");
const jwt = require("jsonwebtoken")

const asyncHandler = require("express-async-handler");
const { use } = require("../routes/userRoutes");

//@desc Register a user
//@route POST /api/users/register
//@access public

const registerUser = asyncHandler(async(req, res)=>{
    const {username, email, password} = req.body;

    if(!username || !email || !password){
        res.status(400);
        throw new Error("all fields are mandatory!");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error(" user already register!")
    }

    // Hash Password

    const hashedPassword = await bcyrpt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });

    console.log(`user created ${user}`);

    if(user){
        res.status(201).json({
            _id :user.id, email : user.email
        });
    }
    else{
        res.status(400);
        throw new Error("User data is not valid");
    }
    res.json({message:"User register successfully"});
});

//@desc Login user 
//@route POST /api/users/login
//@access public

const loginUser = asyncHandler(async(req, res) =>{
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mondatory!")
    }
    const user = await User.findOne({email})
    if(user && (await bcyrpt.compare(password, user.password))){
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user.id
            }
        },process.env.ACCESS_TOKEN_SECRET,{expiresIn:"15m"});
        res.status(200).json({accessToken})
    }else{
        res.status(401);
        throw new Error(" email or passwrd is not valid")
    }
});

//@desc current user info
//@desc POST /api/users/current
//@access private


const currentUser = asyncHandler(async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: "User not authenticated" });
    }
    res.status(200).json(req.user);
});

module.exports = {
    registerUser,
    loginUser,
    currentUser
}