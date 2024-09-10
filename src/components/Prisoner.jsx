import { useRef, useState } from "react";
import "./prisoner.css";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Prisoner = () => {
  const [showapplication, setshowapplication] = useState(false);
  const ref = useRef(null);
  const [Name, setName] = useState("");
  const [FatherName, setFatherName] = useState("");
  const [polstn, setpolstn] = useState("");
  const [age, setage] = useState("");
  const [voter, setvoter] = useState("");
  const [resadd, setresadd] = useState("");
  const [peradd, setperadd] = useState("");
  const [adharnum, setadharnum] = useState("");
  const [prisonedbefore, setprisonedbefore] = useState("");
  const [firdate, setfirdate] = useState("");
  const [datetrial, setdatetrial] = useState("");
  const [crime, setcrime] = useState("");
  const [gender, setgender] = useState("");
  const [userstatus, setuserstatus] = useState("");
  const [BailAmt, setBailAmt] = useState("");
  const [status, setstatus] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(`${import.meta.env.VITE_DEV_URL}/api/prisonerdets`, {  //replace this URL with ${import.meta.env.VITE_DEV_URL} before pushing
          Name,
          FatherName,
          polstn,
          age,
          resadd,
          voter,
          adharnum,
          prisonedbefore,
          firdate,
          crime,
        })
        .then((response) => {
          if (response.data === "Prisoner already exists") {
            setuserstatus("Prisoner already exists");
          }
          console.log(response);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.error(error);
    }

    try {
      await axios.get(`${import.meta.env.VITE_DEV_URL}api/crimes`)
      .then((response)=>{
        response.data.map(crimes=>{
          // console.log(crimes)
          if(crimes.crime===crime){
            console.log("Found")
            console.log(crimes)
            setstatus(crimes["Bail Status"])
            setBailAmt(crimes["Bail Amount"])

            console.log(BailAmt)
          }
        })
        // console.log(response.data)

      })
    } catch (error) {

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
      pdf.save("document.pdf");
    } catch (error) {
      console.error("Error printing the pdf");
    }
  };

  //this opens a new popup, after this the PDF opens the print window view but there are browser inconsistencies with how this is handled

  return (
    <div className="background">
    <div className="container">
      <div className="title text-white">Registration</div>
      <div className="content">
        {userstatus && (
          <h1 className="text-center text-2xl ">
            {userstatus} Proceed to Application
          </h1>
        )}

        <form onSubmit={handleSubmit} action="#">
          <div className="user-details">
            <div className="input-box">
              <span className="details text-white">Full Name</span>
              <input
                name="Name"
                value={Name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="input-box">
              <span className="details text-white">Age</span>
              <input
                name="age"
                value={age}
                onChange={(e) => setage(e.target.value)}
                type="text"
                placeholder="Enter Age"
                required
              />
            </div>
            <div className="input-box">
              <span className="details text-white">Son Of (S/O)</span>
              <input
                name="FatherName"
                value={FatherName}
                onChange={(e) => setFatherName(e.target.value)}
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
              <span className="details text-white">Permanent Address (if exists)</span>
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
              <span className="details text-white">Voter ID Number</span>
              <input
                name="voter"
                value={voter}
                onChange={(e) => setvoter(e.target.value)}
                type="text"
                placeholder="Enter Voter ID"
                required
              />
            </div>
            <div className="input-box">
              <span className="details text-white" >Aadhar Number</span>
              <input
                name="adharnum"
                value={adharnum}
                onChange={(e) => setadharnum(e.target.value)}
                type="text"
                placeholder="Enter Aadhar number"
                required
              />
            </div>
            <div className="input-box">
              <span className="details text-white">No of Prisonment Before</span>
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
                value={firdate}
                onChange={(e) => setfirdate(e.target.value)}
                type="date"
                placeholder="Enter FIR date"
                required
              />
            </div>
            <div className="input-box">
              <span className="details text-white" >Date of Trial</span>
              <input
                name="datetrial"
                value={datetrial}
                onChange={(e) => setdatetrial(e.target.value)}
                type="date"
                placeholder="Enter password"
                required
              />
            </div>

            <div className="conviction text-white">
              <label
                htmlFor="crime"
                style={{ fontSize: "16px;", fontWeight: "500;" }}>
                Convicted For:
              </label>

              <input
                className="rounded border-[2px] ml-3 px-2 py-1"
                onChange={(e) => setcrime(e.target.value)}
                list="crime"
                name="crime"
                value={crime}
                id=""
                placeholder="Select crime"
              />
              
              <datalist id="crime">
                <option value="Cyber Crime"></option>
                <option value="Crime against SCs and STs"></option>
                <option value="Crime against Women"></option>
                <option value="Crime against Children"></option>
                <option value="Offenses against the state"></option>
                <option value="Economic Offenses"></option>
                <option value="Crime against Foreigners"></option>
                <option value="Others"></option>
              </datalist>
            </div>


            <div className="gender-details">
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
              <span className="gender-title text-white" >Gender</span>
              <div className="category">
                <label htmlFor="dot-1">
                  <span className="dot one"></span>
                  <span className="gender text-white" >Male</span>
                </label>
                <label htmlFor="dot-2">
                  <span className="dot two"></span>
                  <span className="gender text-white">Female</span>
                </label>
                <label htmlFor="dot-3">
                  <span className="dot three"></span>
                  <span className="gender text-white" >Other</span>
                </label>
              </div>
              <button
                className="button" type="submit">
                Apply for Bail
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="btns grid grid-cols-">
        <div className="status text-center space-y-3 mt-5">
          <h3 className="text-xl font-semibold ">{status}</h3>
          <h3 className="text-xl font-semibold ">{BailAmt}</h3>
        </div>
        {status === "Bailable" ? (
          <button
            onClick={() => setshowapplication(!showapplication)}
            className="bail-button text-xl"
          >
            Show Application
          </button>
        ) : (
          <div>
            <button
              onClick={() => setshowapplication(!showapplication)}
              className=" bail-button text-xl hidden  "
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
            className=" bg-white rounded-lg mx-auto px-5  py-5 "
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
                    ____________________________________________________ <br />
                  </p>
                  <p style={{ textAlign: "start" }}>
                    P.S. :{" "}
                    <span className="border-b-2 border-black py-2 ">{polstn}</span>{" "}
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
                    I, <span className="border-b-2 border-black py-2 ">{Name}</span>{" "}
                    S/o. Sh.
                    <span className="border-b-2 border-black py-2">
                      {FatherName}
                    </span>
                    <br />
                    R/o
                    ________________________________________________________________
                    Having been <br />
                    acquitted by this Hon&#8217;ble Court on ________________ in
                    above said case FIR No. <br />
                    _________________ P.S.{" "}
                    <span className="border-b-2 border-black py-2 ">
                      {polstn}
                    </span>{" "}
                    U/s _____________ and required to give <br />
                    surety for my attendance before the Hon&#8217;ble Court on
                    condition that I shall attend the Hon&#8217;ble <br />
                    Appellate Court on every date of hearing in which any appeal
                    filed against the judgment & <br />
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
                    I, <span className="border-b-2 border-black py-2">{Name}</span>{" "}
                    S/o. Sh.
                    <span className="border-b-2 border-black py-2">
                      {FatherName}
                    </span>{" "}
                    R/o _______________ <br />
                    ____________________________________________________ hereby
                    declare myself for the above said Sh. <br />
                    <span className="border-b-2 border-black py-2">
                      {Name}
                    </span> S/o{" "}
                    <span className="border-b-2 border-black py-2">
                      {FatherName}
                    </span>{" "}
                    shall attend the appellate <br />
                    court every date in which any appeal filed against the
                    Judgment & Order of acquittal, passed by <br />
                    this Hon&#8217;ble Court and in case making default therein
                    I myself undertake to forfeit to the Govt. <br />
                    of India the sum of Rs. __________________ <br />
                  </p>
                  <p style={{ textAlign: "start" }}>
                    Dated this ..........................................day of
                    ....................201 <br />
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
                    <span className="border-b-2 border-black py-2 border-dotted">
                      {" "}
                      {Name}{" "}
                    </span>
                    son / daughter / wife of
                    .......................................................................................
                    <br />
                    Aged about{" "}
                    <span className="border-b-2 border-black py-2 border-dotted">
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
                    <span className="border-b-2 border-black py-2 border-dotted">
                      {voter}
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
                    3. That deponent is working as
                    ........................................ at
                    ...............................
                    <br />
                    T/C. No ......................... earns Rs
                    ................... per month. <br />
                  </p>
                  <p style={{ marginLeft: "20px" }}>
                    4. That deponent is the owner of household articles valued
                    about of Rs.
                    .............................................................
                    <br />
                    5. That deponent is the owner of the immovable property
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
                    6. That deponent undertakes to produce the accused before
                    the honourable court on every date <br />
                    of hearing. <br />
                  </p>
                  <p style={{ marginLeft: "20px" }}>
                    7. That I have an F.D.R. No
                    ................................................... Issued
                    by
                    ...........................................................
                    <br />
                    For Rs
                    .......................................................................................
                    <br />
                  </p>
                  <p style={{ marginLeft: "20px" }}>
                    8. That I own a vehicle No
                    ....................................................... make
                    .......................................
                    <br />
                    R/C no ..................... at present valued not less than
                    Rs ....................................
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
                    day of 200 ........ that the contents of this Affidavit are
                    true <br />
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
              className="text-xl bg-blue-400 px-2 py-1 rounded-lg ml-[45%] mt-5 mb-5 "
              onClick={printpdf}>
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