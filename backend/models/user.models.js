import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    UserName:{
        type:String,
        required:true,
        unique:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Phone:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profileInfo:{
        type:Object,
        default:{
            Name:"",
            LiscenseNumber:"",
            AssignedCourt:"",
        }
    },
    userRole:{
        type:String,
        default:'user',
        // required:true
    }

},{timestamps:true})

export const Users=new mongoose.model('Users',userSchema)