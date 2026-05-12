import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    profilePicture:{
        type:String,
        default:'/default-profile-picture.jpeg',
    },
    bio:{
        type:String,
        default:'Hey, I am using chat app',
    },
},{timestamps:true});

const User = mongoose.model("User",userSchema);

export default User