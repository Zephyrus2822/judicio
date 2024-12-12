import mongoose, { mongo } from "mongoose";

const updateprisonerSchema = new mongoose.Schema(
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
      
    },

    Trialdate: {
      type: Date,
      default: Date.now(),
    },
    

    Crime: {
      type: String,
      required: true,
    },
    status:{
      type:String,
      required:true
    }
  },
  { timestamps: true }
);

export const updatedPrisoner = new mongoose.model("updatedPrisoner", updateprisonerSchema);
