import React, { useState } from "react";

const BailApplication = () => {
  const [showapplication, setshowapplication] = useState(false);
  const [Name, setName] = useState("");
  const [father, setfather] = useState("");
  const [firdate, setfirdate] = useState("");
  const [police, setpolice] = useState("");
  const [Age, setAge] = useState("");
  const [ElectionId, setElectionId] = useState("");
  const [Adharnum, setAdharnum] = useState("");
  const [crime, setcrime] = useState("");

  return (
    <main className="w-full min-h-[80vh] overflow-hidden">
      <h1 className="text-2xl font-bold text-center mt-10">Apply for Bail</h1>
      <form className="w-full max-w-md mx-auto p-5 bg-gradient-to-tr from-slate-100 to-slate-300 mt-10 rounded-lg shadow-md space-y-4">
        <div className="input grid grid-cols-3">
          <label className="text-xl font-semibold" htmlFor="">
            Name :{" "}
          </label>
          <input
            name="Name"
            value={Name}
            onChange={(e) => setName(e.target.value)}
            className="col-span-2 rounded-lg px-2 py-1 "
            type="text"
          />
        </div>
        <div className="input grid grid-cols-3">
          <label className="text-xl font-semibold" htmlFor="">
            S/O :{" "}
          </label>
          <input
            name="father"
            value={father}
            onChange={(e) => setfather(e.target.value)}
            className="col-span-2 rounded-lg px-2 py-1 "
            type="text"
          />
        </div>
        <div className="input grid grid-cols-3">
          <label className="text-xl font-semibold" htmlFor="">
            FIR Date :{" "}
          </label>
          <input
            name="firdate"
            value={firdate}
            onChange={(e) => setfirdate(e.target.value)}
            className="col-span-2 rounded-lg px-2 py-1 "
            type="text"
          />
        </div>
        <div className="input grid grid-cols-3">
          <label className="text-xl font-semibold" htmlFor="">
            P/S :{" "}
          </label>
          <input
            name="police"
            value={police}
            onChange={(e) => setpolice(e.target.value)}
            className="col-span-2 rounded-lg px-2 py-1 "
            type="text"
          />
        </div>
        <div className="input grid grid-cols-3">
          <label className="text-xl font-semibold" htmlFor="">
            Age :{" "}
          </label>
          <input
            name="Age"
            value={Age}
            onChange={(e) => setAge(e.target.value)}
            className="col-span-2 rounded-lg px-2 py-1 "
            type="text"
          />
        </div>
        <div className="input grid grid-cols-3">
          <label className="text-xl font-semibold" htmlFor="">
            Election card number :{" "}
          </label>
          <input
            name="ElectionId"
            value={ElectionId}
            onChange={(e) => setElectionId(e.target.value)}
            className="col-span-2 rounded-lg px-2 py-1 "
            type="text"
          />
        </div>
        <div className="input grid grid-cols-3">
          <label className="text-xl font-semibold" htmlFor="">
            Addhar Number :{" "}
          </label>
          <input
            name="Adharnum"
            value={Adharnum}
            onChange={(e) => setAdharnum(e.target.value)}
            className="col-span-2 rounded-lg px-2 py-1 "
            type="text"
          />
        </div>
        <div className="input grid grid-cols-3">
          <label className="text-xl font-semibold" htmlFor="">
            Crime :{" "}
          </label>
          <input
            name="crime"
            value={crime}
            onChange={(e) => setcrime(e.target.value)}
            className="col-span-2 rounded-lg px-2 py-1 "
            type="text"
          />
        </div>
      </form>
      <button
        onClick={() => setshowapplication(!showapplication)}
        className="text-xl bg-blue-400 px-2 py-1 rounded-lg ml-[45%] mt-5 mb-5 "
      >
        Show Application
      </button>
      <div className="application">
        {showapplication && (
          <div className="bailapplication w-[55%] mx-auto px-20  py-5 ">
            <div
              style={{
                pageBreakBefore: "always",
                pageBreakAfter: "always",
                textAlign: "center",
                marginLeft: "40px",
                fontFamily: "Roboto",
                marginTop: "10px",
              }}
            >
              <div>
                <p style={{ fontWeight: "bold", marginBottom: "15px" }}>
                  BAIL BOND U/S 437-A CR.P.C. <br />
                </p>
                <p style={{ fontWeight: "bold", marginBottom: "15px" }}>
                  BOND & BAIL BOND FOR ATTENDANCE BEFORE THE APPELLANT COURT{" "}
                  <br />
                </p>
                <p style={{ textAlign: "start" }}>
                  In the court of Sh.
                  ____________________________________________________ <br />
                </p>
                <p style={{ textAlign: "start" }}>
                  P.S. :{" "}
                  <span className="border-b-2 border-black">{police}</span>{" "}
                  <br />
                </p>
                <p style={{ textAlign: "start" }}>
                  U/S ___________________ <br />
                </p>
                <p style={{ textAlign: "start" }}>
                  FIR No. _________________ <br />
                </p>
                <p style={{ fontWeight: "bold" }}>
                  <u>PERSONAL BOND</u> <br />
                </p>
                <p style={{ textAlign: "start", padding: "5px auto" }}>
                  I, <span className="border-b-2 border-black">{Name}</span>{" "}
                  S/o. Sh.
                  <span className="border-b-2 border-black">{father}</span>
                  <br />
                  R/o
                  ________________________________________________________________
                  Having been <br />
                  acquitted by this Hon&#8217;ble Court on ________________ in
                  above said case FIR No. <br />
                  _________________ P.S.{" "}
                  <span className="border-b-2 border-black">{police}</span> U/s
                  _____________ and required to give <br />
                  surety for my attendance before the Hon&#8217;ble Court on
                  condition that I shall attend the Hon&#8217;ble <br />
                  Appellate Court on every date of hearing in which any appeal
                  filed against the judgment & <br />
                  Order of acquittal, passed by this Hon&#8217;ble Court and in
                  case making default therein I myself <br />
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
                <p style={{ textAlign: "start", fontWeight: "bold" }}>
                  <u>SURETY BOND</u> <br />
                </p>
                <p style={{ textAlign: "start" }}>
                  I, <span className="border-b-2 border-black">{Name}</span>{" "}
                  S/o. Sh.
                  <span className="border-b-2 border-black">{father}</span> R/o
                  _______________ <br />
                  ____________________________________________________ hereby
                  declare myself for the above said Sh. <br />
                  <span className="border-b-2 border-black">
                    {Name}
                  </span> S/o{" "}
                  <span className="border-b-2 border-black">{father}</span>{" "}
                  shall attend the appellate <br />
                  court every date in which any appeal filed against the
                  Judgment & Order of acquittal, passed by <br />
                  this Hon&#8217;ble Court and in case making default therein I
                  myself undertake to forfeit to the Govt. <br />
                  of India the sum of Rs. __________________ <br />
                </p>
                <p style={{ textAlign: "start" }}>
                  Dated this ..........................................day of
                  ....................201 <br />
                </p>
                <p>
                  <br />
                </p>
                <p style={{ textAlign: "end" }}>
                  Signature <br />
                </p>
                <p style={{ textAlign: "center", marginRight: "33px" }}>
                  Presented by:
                </p>
              </div>

              <div
                style={{
                  pageBreakBefore: "always",
                  pageBreakAfter: "always",
                  marginLeft: "40px",
                  fontFamily: "Roboto",
                  marginTop: "25px",
                }}
              >
                <div>
                  <p style={{ textAlign: "center", fontWeight: "bold" }}>
                    <i>AFFIDAVIT</i>
                  </p>
                  <br />
                  <p>
                    I
                    <span className="border-b-2 border-black border-dotted">
                      {" "}
                      {Name}{" "}
                    </span>
                    son / daughter / wife of
                    .......................................................................................
                    <br />
                    Aged about{" "}
                    <span className="border-b-2 border-black border-dotted">
                      {" "}
                      {Age}{" "}
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
                    <span className="border-b-2 border-black border-dotted">
                      {ElectionId}
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
                  <p style={{ fontWeight: "bold", textAlign: "end" }}>
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
                  <p style={{ fontWeight: "bold", textAlign: "end" }}>
                    DEPONENT <br />
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        {showapplication && (
          <button className="text-xl bg-blue-400 px-2 py-1 rounded-lg ml-[45%] mt-5 mb-5 ">
            Pay the amount and print the application
          </button>
        )}
      </div>
    </main>
  );
};

export default BailApplication;
