import mongoose, { mongo } from "mongoose";

const applicationSchema=new mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    FathersName: {
        type: String,
        required: true,
    },
    AddharNum: {
        type: String,
        required: true,
    },
    AddharImage:{
        type: String,
        required: true,
    },
    ElectionId:{
        type: String,
        required: true,
    },
    Firdate:{
        type:String,
        required:true
    },
    
    Crime: {
        type: String,
        required: true,
    },
    Status: {
        type: String,
        required: true,
    }
},{timestamps:true})

export const Applications=new mongoose.model("Applications",applicationSchema)