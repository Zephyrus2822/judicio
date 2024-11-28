import moment from "moment";
import { crimes } from "../models/crime.models.js";
import { Users } from "../models/user.models.js";

const addCase = async (req, res) => {
  const { Crime, Section, CrimeCategory,PrisonDuration, MinBailAmt,MaxBailAmount, BailConditions, Bailable,BailCrieteria } =
    req.body;

  console.log(req.body);

  try {
    await crimes
      .create({
        Crime: Crime,
        Section: Section,
        CrimeCategory: CrimeCategory,
        PrisonDuration:PrisonDuration,
        BailDetails: {
          Bailable: Bailable,
          MinBailAmount: MinBailAmt,
          MaxBailAmount:MaxBailAmount,
          BailConditions: BailConditions,
        
        },
      })
      .then(() => {
        res.json("Case registered successfully");
      });
    // Users.findOne({})
  } catch (error) {
    console.error(error.message);
  }
};

const verifyCrime=async(req,res)=>{
  const {Crimeid}=req.body;
  try {
    const updatedCrime=await crimes.findByIdAndUpdate(Crimeid,{Status:"Verified"})
    console.log(updatedCrime)

    if(updatedCrime){
      res.json("Crime verified successfully")
    }
  } catch (error) {
    console.error(error.message);
    res.json(error.message);
  }
}

const getcase = async (req, res) => {
  try {
    const crime = await crimes.find();
    res.json(crime);
  } catch (error) {
    console.error(error.message);
  }
};

export default { addCase, getcase ,verifyCrime};
