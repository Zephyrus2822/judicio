import mongoose from "mongoose";

const prisonerSchema = new mongoose.Schema(
  {
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
      unique: true,
    },
    Contact_info:{
      type: Object,
      required: true,
      default:{
        Phone: "",
      
        Address:""
      }
    },
    

    FIRdate: {
      type: Date,
      default: Date.now(),
    },
    Witness:{
      type:String,
      required:true
    },

    Crime: {
      type: String,
      required: true,
    },
    CrimeCategory:{
      type: String,
      required:true
    },
    Complience:{
      type:String,
      default:"In Prison"
    }
    
  },
  { timestamps: true }
);

export const Prisoner = new mongoose.model("Prisoner", prisonerSchema);
