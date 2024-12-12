import { crimes } from "../models/crime.models.js";
import { Prisoner } from "../models/Prisoner.models.js";

const addprisoner = async (req, res) => {
  const { Name, Fname, adharnum, firdate, Address, Phone, witness, crime} =
    req.body;
    console.log(req.body);
  console.log(Name, Fname, adharnum, firdate, Address, Phone, witness, crime)

  try {
    
    const prisoner = await Prisoner.findOne({ AddharNum: adharnum });
    if (prisoner) {
      res.json("Prisoner already exists");
    } else {
        const crimess=await crimes.findOne({Crime:crime})
        // console.log(crimess)
        const addprisoner=await Prisoner.create({
        Name: Name,
        FathersName: Fname,
        AddharNum: adharnum,
        Contact_info: {
          Phone: Phone,
          Address: Address,
        },
        FIRDate: firdate,
        Witness: witness,
        Crime: crime,
        CrimeCategory:crimess.CrimeCategory
      })
      if(addprisoner){
        res.json("Prisoner added successfully")
      }
    }
  } catch (error) {
    console.error(error);
    resizeBy.json("error adding prisoner ",error);
  }
};

const updateprisoner = async (req, res) => {
  const {adharnum,enquiryimageurl}=req.body;
  console.log(req.body);
  const response=await Prisoner.findOneAndUpdate({AddharNum:adharnum},{ $set: { EnqiryReport: enquiryimageurl }})
  if(response){
    res.json("Enquiry Report updated successfully")
  }else{
    res.json("Error updating Enquiry Report")
  }

}

const getprisoner = async (req, res) => {
  try {
    const prisoners = await Prisoner.find({});
    return res.json(prisoners);
  } catch (error) {
    console.error(error);
    res.json("Error fetching prisoners");
  }
};

export default { addprisoner, getprisoner,updateprisoner };
