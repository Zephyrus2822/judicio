import mongoose from "mongoose";

const CaseSchema=new mongoose.Schema({
   
    Crime:{
        type:String,
        required:true
    },
    Section:{
        type:String,
        required:true
    },
    CrimeCategory:{
        type:String,
        required:true
    },
    PrisonDuration:{
        type:String,
        required:true
    },
    BailDetails:{
        type:Object,
        required:true,
        default:{
            Bailable:"",
            MinBailAmount:"",
            MaxBailAmount:"",
           
            BailConditions:"",
        }
    },
    Status:{
        type:String,
        default:'Pending',

    }

},{timestamps:true})

export const crimes=new mongoose.model('crimes',CaseSchema)