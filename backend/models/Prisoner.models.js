import mongoose, { mongo } from "mongoose";

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
    ResAddress: {
      type: String,
      required: true,
    },
    PoliceStation: {
      type: String,
      required: true,
    },
    Age: {
      type: Number,
      required: true,
    },

    AddharNum: {
      type: String,
      required: true,
      unique: true,
    },
    ElectionId: {
      type: String,
      required: true,
      unique: true,
    },
    prisonbefore: {
      type: String,
      required: true,
    },
    FIRdate: {
      type: Date,
      default: Date.now(),
    },

    Crime: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Prisoner = new mongoose.model("Prisoner", prisonerSchema);
