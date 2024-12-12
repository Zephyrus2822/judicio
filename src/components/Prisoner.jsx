import { useRef, useState, useEffect } from "react";
import "./prisoner.css";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { FaCloudUploadAlt } from "react-icons/fa";
import video from "../assets/video04.mp4";
import Swal from "sweetalert2";

const Prisoner = () => {
  {
    /geting api details/
  }
  const [Users, setUsers] = useState([]);
  const [crimes, setcrimes] = useState([]);

  {
    /information/
  }
  const [showapplication, setshowapplication] = useState(false);
  const ref = useRef(null);
  const [Name, setName] = useState("");
  const [FName, setFName] = useState("");
  const [polstn, setpolstn] = useState("");
  const [age, setage] = useState("");
  const [EId, setEId] = useState("");
  const [resadd, setresadd] = useState("");
  const [peradd, setperadd] = useState("");
  const [Adharnum, setAdharnum]=useState("");
  const [prisonedbefore, setprisonedbefore] = useState("");
  const [FirDate, setfirdate] = useState("");
  const [TrialDate, setTrialDate] = useState("");
  const [crimecat, setcrimecat] = useState("");
  const [crime, setcrime] = useState("");
  const [gender, setgender] = useState("");
  const [userstatus, setuserstatus] = useState("");
  const [minbailamt, setminbailamt] = useState("");
  const [maxbailamt, setmaxbailamt] = useState("");
  const [status, setstatus] = useState("");
  const [Phone, setPhone] = useState("")
  const [bailstatus, setbailstatus] = useState("");

  const [adharimage, setadharimage] = useState(null);
  const [adharimageurl, setadharimageurl] = useState("");
  // Name,
  //       FName,
        // Adharnum      adharimg,
  //       EId,
  //       FirDate,
  //       Crime,
        // JudgeName,
  //       LawyerName,
  //       TrialDate,

  {
    //form status/
  }
  const [isuploading, setisuploading] = useState(false);

  const [LawyerName, setLawyerName] = useState("");
  const [JudgeName, setJudgeName] = useState("");

  const [selectedOption, setselectedOption] = useState(null);
  const [index, setindex] = useState(0);

  const fetchdata = async () => {
    try {
      const users = await axios.get(
        `${import.meta.env.VITE_DEV_URL}auth/users`
      );
      // console.log(users)
      const crimes = await axios.get(
        `${import.meta.env.VITE_DEV_URL}api/cases/crimes`
      );

      // console.log(crimes)
      setcrimes(crimes.data);
      // console.log(users)
      setUsers(users.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const JudgeNamesss = Users.filter((user) => user.userRole === "Judge");
  console.log(JudgeNamesss);
  const LawyerNamesss = Users.filter((user) => user.userRole === "Lawyer");
  console.log(LawyerNamesss);

  const crimeCategory = [
    "Offence Against Women",
    "Offence Against Children",
    "Offence Against Persons",
    "Offence Against the State",
    "Offence Against Property",
    "Offence Relating to Marriage and Family",
    "Offenses Against Foreigners",
    "Economic Offenses",
  ];
  const crimess = crimes.filter((crime) => crime.CrimeCategory === crimecat);

  // console.log(crimes);
  // const crimecatnn=crimes.filter(crime=>crime.crimeCategory===crimecat)
  // console.log(crimecatnn)

  const handleSubmit = (e) => {
    e.preventDefault();
    const applicable = crimes.filter((cr) => cr.Crime === crime);
    console.log(applicable[0]);
    setminbailamt(applicable[0].BailDetails.MinBailAmount);
    setmaxbailamt(applicable[0].BailDetails.MaxBailAmount);
    setisuploading(true)

    if (applicable[0].BailDetails.Bailable === "No") {
      setstatus(
        "your Crime is not applicable for Bail . Kindly contact the nearest Court "
      );
    } else {
      setstatus(
        "your Crime is applicable for Bail . please download the Application"
      );
      axios.post(`${import.meta.env.VITE_DEV_URL}api/applications/apply`, {
        Name,
        FName,
        Adharnum  , 
        Phone,
        adharimageurl,
        EId,
        FirDate,
        crime,
        JudgeName,
        LawyerName,
        TrialDate,
      })
      .then(res=>{
        console.log(res)
        if(res.data==='Application submitted successfully'){
          Swal.fire({
            title: "Application Submitted Successfully",
            text: "Your application has been submitted successfully.Kindly proceed to application.",
            icon: "success",
            
          })
          setisuploading(false)
        }else{
          Swal.fire({
            title: "Error",
            text: "An error occurred while submitting your application. Please try again.",
            icon: "error",
          })
        }
        setisuploading(false)
        // alert("Application submitted successfully")
      })
    }
  };

  const printpdf = async () => {
    const input = ref.current;
    try {
      const canvas = await html2canvas(input);
      const imgdata = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
        pagesplit: true,
      });

      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgdata, "PNG", 0, 0, width, height);
      pdf.save(`${Name}.pdf`);
    } catch (error) {
      console.error("Error printing the pdf");
    }
  };

  const uploadImage = async (e) => {
    setisuploading(true);
    e.preventDefault();
    const data = new FormData();
    data.append("file", adharimage);
    data.append("upload_preset", "myCloud");
    data.append("cloud_name", "dcn17cw7n");
    try {
      if (adharimage === null) {
        return alert("Please upload an image");
      }
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dcn17cw7n/image/upload",
        data
      );

      setadharimageurl(res.data.url);
      //   console.log(res.data.url);
      // Toast.success()
      Swal.fire({
        title: "Image Uploaded Successfully",
        text: "Your image has been uploaded successfully",
        icon: "success",
      })
      setisuploading(false);
    } catch (error) {
      console.error("An error occurred while uploading", error);
    }
  };

  //this opens a new popup, after this the PDF opens the print window view but there are browser inconsistencies with how this is handled

  return (
    <div className='bg-gradient-to-br from-amber-200 to-orange-600 min-h-screen py-10 '>
      <div className="container">
        <div className="flex justify-center align-middle items-center text-orange-600 text-4xl font-bold mt-3">
          APPLY FOR BAIL
        </div>
        <div className="content p-5">
          <form onSubmit={handleSubmit}>
            <div className="user-details">
              <div className="input-box">
                <span className="details text-white">Full Name</span>
                <input
                  name="Name"
                  value={Name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Enter Your Name"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details text-white">Age</span>
                <input
                  className="input-text"
                  name="age"
                  value={age}
                  onChange={(e) => setage(e.target.value)}
                  type="text"
                  placeholder="Enter Age"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details text-white">Son Of (S/O) (D/O)</span>
                <input
                  name="FName"
                  value={FName}
                  onChange={(e) => setFName(e.target.value)}
                  type="text"
                  placeholder="Enter Father's Name"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details text-white">Phone number</span>
                <input
                  name="FName"
                  value={Phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="text"
                  placeholder="Enter Father's Name"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details text-white">Residential Address</span>
                <input
                  name="resadd"
                  value={resadd}
                  onChange={(e) => setresadd(e.target.value)}
                  type="text"
                  placeholder="Enter Residential Address"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details text-white">
                  Permanent Address (if exists)
                </span>
                <input
                  name="peradd"
                  value={peradd}
                  onChange={(e) => setperadd(e.target.value)}
                  type="text"
                  placeholder="Enter Permanent Address"
                />
              </div>
              <div className="input-box">
                <span className="details text-white">Police Station (P/S)</span>
                <input
                  name="polstn"
                  value={polstn}
                  onChange={(e) => setpolstn(e.target.value)}
                  type="text"
                  placeholder="Tobin Road PS"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details text-white">EId ID Number</span>
                <input
                  name="EId"
                  value={EId}
                  onChange={(e) => setEId(e.target.value)}
                  type="text"
                  placeholder="Enter EId ID"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details text-white">Aadhar Number</span>
                <input
                  name="Adharnum"             
                  value={Adharnum}
                  onChange={(e) => setAdharnum(e.target.value)}
                  type="text"
                  placeholder="Enter Aadhar number"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details text-white">
                  No of Prisonment Before
                </span>
                <input
                  name="prisonedbefore"
                  value={prisonedbefore}
                  type="number"
                  onChange={(e) => setprisonedbefore(e.target.value)}
                  placeholder="Enter the no of prisonment before"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details text-white">FIR Lodge Date</span>
                <input
                  name="firdate"
                  value={FirDate}
                  onChange={(e) => setfirdate(e.target.value)}
                  type="date"
                  placeholder="Enter FIR date"
                  required
                />
              </div>
              <div className="input-box">
                <span className="details text-white">Date of Trial</span>
                <input
                  name="TrialDate"
                  value={TrialDate}
                  onChange={(e) => setTrialDate(e.target.value)}
                  type="date"
                  placeholder="Enter password"
                  required
                />
              </div>

              {/*About Crimes*/}
              <div
                className="dropdown-containers"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "20px",
                }}
              >
                {/* crimeCategory */}
                {/* crimeCategory */}

                <label className="text-2xl text-white" htmlFor="">Crime Category</label>
                <select
                className="text-xl text-black"
                  value={crimecat}
                  onChange={(e) => setcrimecat(e.target.value)}
                >
                  <option  value="">Select Crime Category</option>
                  {crimeCategory.map((cat) => (
                    <option key={cat}>{cat}</option>
                  ))}
                </select>

                {/*Crimes*/}
                <label className="text-2xl text-white" id="crime1">CRIME</label>
                <select
                  name=""
                  className="text-xl text-black"
                  value={crime}
                  onChange={(e) => setcrime(e.target.value)}
                  id=""
                >
                  <option value="">Select Crime</option>
                  {crimess.map((crimee, i) => (
                    <option key={i}>{crimee.Crime}</option>
                  ))}
                </select>

                {/* JudgeNames */}
                {/* <label htmlFor="">JudgeNames</label>
                <select
                  name=""
                  value={JudgeName}
                  onChange={(e) => setJudgeName(e.target.value)}
                  id=""
                >
                  <option value="">Select your JudgeName</option>
                  {JudgeNamesss.map((JudgeName, i) => (
                    <option key={i} value={JudgeName.profileInfo.Name}>{JudgeName.profileInfo.Name}</option>
                  ))}
                </select> */}

                {/* LawyerNames */}

                <label className="text-2xl text-white" htmlFor="">LawyerNames</label>
                <select
                  name=""
                  className="text-xl text-black "
                  value={LawyerName}
                  onChange={(e) => setLawyerName(e.target.value)}
                  id=""
                >
                  <option value="">Select your LawyerName</option>
                  {LawyerNamesss.map((LawyerName, i) => (
                    <option key={i} value={LawyerName.profileInfo.Name}>{LawyerName.profileInfo.Name}</option>
                  ))}
                </select>
              </div>

              <div className="gender-details ml-2">
                <input
                  value={gender}
                  onChange={(e) => setgender(e.target.value)}
                  type="radio"
                  name="gender"
                  id="dot-1"
                />
                <input
                  value={gender}
                  onChange={(e) => setgender(e.target.value)}
                  type="radio"
                  name="gender"
                  id="dot-2"
                />
                <input
                  value={gender}
                  onChange={(e) => setgender(e.target.value)}
                  type="radio"
                  name="gender"
                  id="dot-3"
                />
                <span className="gender-title text-white">Gender</span>
                <div className="category">
                  <label htmlFor="dot-1">
                    <span className="dot one"></span>
                    <span className="gender text-white">Male</span>
                  </label>
                  <label htmlFor="dot-2">
                    <span className="dot two"></span>
                    <span className="gender text-white">Female</span>
                  </label>
                  <label htmlFor="dot-3">
                    <span className="dot three"></span>
                    <span className="gender text-white">Other</span>
                  </label>
                </div>
                <div className="border-2 flex justify-center px-2 items-center border-white rounded-lg gap-2 py-2">
                  <label className=" text-white h-12 mr-5 p-5">
                    Add Aadhar Card
                  </label>
                  <input
                    onChange={(e) => setadharimage(e.target.files[0])}
                    className=" text-white "
                    type="file"
                    name="adharimage"
                    id="aadhar-upload"
                  />
                  <button
                    disabled={isuploading}
                    className="text-3xl invert"
                    onClick={uploadImage}
                  >
                    <FaCloudUploadAlt />
                  </button>
                </div>

                <button
                  disabled={isuploading}
                  className="button ml-2"
                  type="submit"
                >
                  Check for Bail
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="btns grid grid-cols-">
          {status.length > 0 ? (
            <div className="status text-center space-y-3 mt-5">
              <h3 className="text-3xl text-white font-semibold ">{status}</h3>
              <h3 className="text-3xl text-white font-semibold ">
                Bail Amount Ranges from {minbailamt} - {maxbailamt}
              </h3>
            </div>
          ) : null}

          {status ===
          "your Crime is applicable for Bail . please download the Application" ? (
            <button
              onClick={() => setshowapplication(!showapplication)}
              className="button mx-[900px] my-5 text-2xl "
            >
              Show Application
            </button>
          ) : (
            <div>
              <button
                onClick={() => setshowapplication(!showapplication)}
                className="bail-button text-xl hidden  "
              >
                Show Application
              </button>
            </div>
          )}
          {status === "Non-bailable" && (
            <h1 className="text-center text-xl text-white mt-5">
              You are not applicable to apply for the bail
            </h1>
          )}
        </div>
        <div className="application w-full min-h-[80%]">
          {showapplication && (
            <div
              ref={ref}
              id="bailapplication"
              className="text-black bg-white rounded-lg mx-auto px-5  py-5  w-[1000px]"
            >
              <div
                style={{
                  pageBreakBefore: "always",
                  pageBreakAfter: "always",
                  textAlign: "center",
                  fontFamily: "Roboto",
                  marginTop: "10px",
                }}
              >
                <div className="bail-application">
                  <p style={{ fontWeight: "bold", marginBottom: "15px" }}>
                    BAIL BOND U/S 437-A CR.P.C. <br />
                  </p>
                  <p style={{ fontWeight: "bold", marginBottom: "15px" }}>
                    BOND & BAIL BOND FOR ATTENDANCE BEFORE THE APPELLANT COURT{" "}
                    <br />
                  </p>
                  <div className="mx-32">
                    <p style={{ textAlign: "start" }}>
                      In the court of Sh.
                      ____________________________________________________{" "}
                      <br />
                    </p>
                    <p style={{ textAlign: "start" }}>
                      P.S. :{" "}
                      <span className="border-b-2 botext-white py-2 ">
                        {polstn}
                      </span>{" "}
                      <br />
                    </p>
                    <p style={{ textAlign: "start" }}>
                      U/S ___________________ <br />
                    </p>
                    <p style={{ textAlign: "start" }}>
                      FIR No. _________________ <br />
                    </p>
                  </div>

                  <p style={{ fontWeight: "bold", marginBottom: "50px" }}>
                    <u>PERSONAL BOND</u> <br />
                  </p>
                  <div className="mx-32 mb-10">
                    <p style={{ textAlign: "start", padding: "5px auto" }}>
                      I,{" "}
                      <span className="border-b-2 botext-white py-2 ">
                        {Name}
                      </span>{" "}
                      S/o. Sh.
                      <span className="border-b-2 botext-white py-2">
                        {FName}
                      </span>
                      <br />
                      R/o
                      ________________________________________________________________
                      Having been <br />
                      acquitted by this Hon&#8217;ble Court on ________________
                      in above said case FIR No. <br />
                      _________________ P.S.{" "}
                      <span className="border-b-2 botext-white py-2 ">
                        {polstn}
                      </span>{" "}
                      U/s _____________ and required to give <br />
                      surety for my attendance before the Hon&#8217;ble Court on
                      condition that I shall attend the Hon&#8217;ble <br />
                      Appellate Court on every date of hearing in which any
                      appeal filed against the judgment & <br />
                      Order of acquittal, passed by this Hon&#8217;ble Court and
                      in case making default therein I myself <br />
                      undertake to forfeit to the Govt. of India the sum of Rs.
                      ____________________ <br />
                    </p>
                    <p style={{ textAlign: "start", padding: "5px auto" }}>
                      Delhi <br />
                    </p>
                    <p style={{ textAlign: "start", padding: "5px auto" }}>
                      Date: <br />
                    </p>
                    <p style={{ textAlign: "start", padding: "5px auto" }}>
                      Signature <br />
                    </p>
                  </div>
                  <div className="mx-32">
                    <p
                      style={{
                        textAlign: "start",
                        fontWeight: "bold",
                        marginBottom: "20px",
                      }}
                    >
                      <u>SURETY BOND</u> <br />
                    </p>
                    <p style={{ textAlign: "start" }}>
                      I,{" "}
                      <span className="border-b-2 botext-white py-2">
                        {Name}
                      </span>{" "}
                      S/o. Sh.
                      <span className="border-b-2 botext-white py-2">
                        {FName}
                      </span>{" "}
                      R/o _______________ <br />
                      ____________________________________________________
                      hereby declare myself for the above said Sh. <br />
                      <span className="border-b-2 botext-white py-2">
                        {Name}
                      </span>{" "}
                      S/o{" "}
                      <span className="border-b-2 botext-white py-2">
                        {FName}
                      </span>{" "}
                      shall attend the appellate <br />
                      court every date in which any appeal filed against the
                      Judgment & Order of acquittal, passed by <br />
                      this Hon&#8217;ble Court and in case making default
                      therein I myself undertake to forfeit to the Govt. <br />
                      of India the sum of Rs. __________________ <br />
                    </p>
                    <p style={{ textAlign: "start" }}>
                      Dated this ..........................................day
                      of ....................201 <br />
                    </p>
                    <p>
                      <br />
                    </p>
                  </div>

                  <div className="flex justify-start items-center gap-[400px] mx-32">
                    <p
                      style={{
                        textAlign: "left",
                        marginRight: "33px",
                        marginTop: "20px",
                      }}
                    >
                      Presented by:
                    </p>
                    <p style={{ textAlign: "center", marginTop: "20px" }}>
                      Signature <br />
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    pageBreakBefore: "always",
                    pageBreakAfter: "always",
                    marginLeft: "40px",
                    fontFamily: "Roboto",
                    marginTop: "45px",
                    paddingBottom: "40px",
                  }}
                >
                  <div>
                    <p style={{ textAlign: "center", fontWeight: "bold" }}>
                      <i>AFFIDAVIT</i>
                    </p>
                    <br />
                    <p>
                      I
                      <span className="border-b-2 botext-white py-2 border-dotted">
                        {" "}
                        {Name}{" "}
                      </span>
                      son / daughter / wife of
                      .......................................................................................
                      <br />
                      Aged about{" "}
                      <span className="border-b-2 botext-white py-2 border-dotted">
                        {" "}
                        {age}{" "}
                      </span>{" "}
                      R/o
                      ...............................................................................
                      <br />
                      do hereby solemnly affirm and declare as under
                      ...................................................
                      <br />
                    </p>
                    <p style={{ marginLeft: "20px" }}>
                      1. That deponent is the resident of above said address and
                      having his/her Ration Card no. is
                      ............................
                      <br />
                      .......................... and Election Card No.
                      <span className="border-b-2 botext-white py-2 border-dotted">
                        {EId}
                      </span>{" "}
                      <br />
                    </p>
                    <p style={{ marginLeft: "20px" }}>
                      2. That accused is
                      ...................................................................................
                      <br />
                      of the deponent and deponent has full control over him/her
                      and capable to produce him/her <br />
                      before this hon&#8217;ble court.
                      <br />
                    </p>
                    <p style={{ marginLeft: "20px" }}>
                      3. That deponent is
                      ...................................................................................
                      <br />
                      of the deponent and deponent has full control over him/her
                      and capable to produce him/her <br />
                      before this hon&#8217;ble court.
                      <br />
                    </p>
                    <p style={{ marginLeft: "20px" }}>
                      4. That deponent is working as
                      ........................................ at
                      ...............................
                      <br />
                      T/C. No ......................... earns Rs
                      ................... per month. <br />
                    </p>
                    <p style={{ marginLeft: "20px" }}>
                      5. That deponent is the owner of household articles valued
                      about of Rs.
                      .............................................................
                      <br />
                      6. That deponent is the owner of the immovable property
                      bearing No. ............................
                      <br />
                    </p>
                    <p style={{ marginLeft: "20px" }}>
                      Measuring .................................. sq. yards
                      situated at ...........................
                      <br />
                      valued not less than Rs
                      ....................................................................
                      <br />
                    </p>
                    <p style={{ marginLeft: "20px" }}>
                      7. That deponent undertakes to produce the accused before
                      the honourable court on every date <br />
                      of hearing. <br />
                    </p>
                    <p style={{ marginLeft: "20px" }}>
                      8. That I have an F.D.R. No
                      ................................................... Issued
                      by
                      ...........................................................
                      <br />
                      For Rs
                      .......................................................................................
                      <br />
                    </p>
                    <p style={{ marginLeft: "20px" }}>
                      9. That I own a vehicle No
                      .......................................................
                      make .......................................
                      <br />
                      R/C no ..................... at present valued not less
                      than Rs ....................................
                      <br />
                    </p>
                    <p
                      style={{
                        fontWeight: "bold",
                        textAlign: "end",
                        marginRight: "140px",
                      }}
                    >
                      <br />
                      DEPONENT <br />
                    </p>
                    <p style={{ fontWeight: "bold", marginTop: "15px" }}>
                      VERIFICATION <br />
                      Verified at Delhi on this ................................
                      day of 200 ........ that the contents of this Affidavit
                      are true <br />
                      and correct to the best of my knowledge & nothing material
                      has been concealed therefrom, no part of it <br />
                      is untrue.
                      <br />
                    </p>
                    <p
                      style={{
                        fontWeight: "bold",
                        textAlign: "end",
                        marginRight: "140px",
                      }}
                    >
                      DEPONENT <br />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {showapplication && (
            <div>
              <button
                className="button text-xl  px-2  rounded-lg ml-[45%] mt-5 mb-5 "
                onClick={printpdf}
              >
                Print Application
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Prisoner;