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
    status:{
      type:String,
      required:true
    }
  },
  { timestamps: true }
);

export const updatedPrisoner = new mongoose.model("updatedPrisoner", updateprisonerSchema);
