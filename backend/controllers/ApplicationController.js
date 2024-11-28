import { applications } from "../models/BailApplications.models.js";
import { crimes } from "../models/crime.models.js";
import { Prisoner } from "../models/Prisoner.models.js";
import { Users } from "../models/user.models.js";

const apply = async (req, res) => {
  const {
    Name,
    FName,
    Adharnum,
    adharimg,
    EId,
    FirDate,
    Crime,
    JudgeName,
    LawyerName,
    TrialDate,
  } = req.body;
  console.log(req.body);

  try {
    const judge = await Users.findOne({ Email: JudgeName });
    const Lawyer = await Users.findOne({ Email: LawyerName });
    const crimeCat = await crimes.findOne({ Crime: Crime });

    if (await applications.findOne({ ProfileInfo: { AddharNum: Adharnum } })) {
      return res.json("Already applied for Bail");
    }
    const applicant = await Prisoner.findOne({ AddharNum: Adharnum });
    if (!(await Prisoner.findOne({ AddharNum: Adharnum }))) {
      return res.json("Prisoner Does not exists in Databsae");
    }
    const Application = await applications.create({
      CrimeCategory_id: crimeCat.CrimeCategory,
      lawyer_id: Lawyer._id,
      Judge_id: judge._id,
      applicantInfo: {
        prisoner_id: applicant._id,
        Name: Name,
        FathersName: FName,
        AddharNum: Adharnum,
        AddharImage: adharimg,
        ElectionId: EId,
        Firdate: FirDate,
        Crime: Crime,
      },
      Descision_Date: TrialDate,
    });
    if (Application) {
      res.json("Application submitted successfully");
    }
  } catch (error) {
    console.error(error);
    res.json("Error in applying for bail");
  }
};

const getStatus = async (req, res) => {
  try {
    const application = await applications.find();
    if (application) {
      res.json(application);
    }
  } catch (error) {
    console.error(error);
    res.json("Error in getting application status");
  }
};

const acceptApplication = async (req, res) => {
  const { applicationId } = req.body;
  console.log(req.body);
  try {
    // const application=await applications.findByIdAndUpdate(applicationId,{Status: "Accepted"});
    const application = await applications.findOne({ _id: applicationId });
    const updateApplication = await applications.findByIdAndUpdate(
      applicationId,
      { Status: "Accepted" }
    );
    // console.log(application);

    const applicant = await Prisoner.findByIdAndUpdate(
      application.applicantInfo.prisoner_id,
      { Complience: "On Bail" }
    );
    if (applicant && updateApplication) {
      res.json("Application accepted successfully");
    }
  } catch (error) {
    console.error(error);
    res.json("Error in accepting application");
  }
};
const RejectApplication = async (req, res) => {
  const { applicationId } = req.body;
  console.log(req.body);
  try {
    const application = await applications.findByIdAndUpdate(applicationId, {
      Status: "Rejected",
    });
    if (application) {
      res.json("Application Rejected successfully");
    }
  } catch (error) {
    console.error(error);
    res.json("Error in application");
  }
};
const VerifyApplication = async (req, res) => {
  const { applicationId } = req.body;
  console.log(req.body);
  try {
    const application = await applications.findByIdAndUpdate(applicationId, {
      Status: "Verified",
    });
    if (application) {
      res.json("Application Verified successfully");
    }
  } catch (error) {
    console.error(error);
    res.json("Error in application");
  }
};

export default {
  apply,
  getStatus,
  acceptApplication,
  RejectApplication,
  VerifyApplication,
};
