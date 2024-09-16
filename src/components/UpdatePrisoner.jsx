import React, { useState } from "react";
import "./updateprisoner.css";
import axios from "axios";

const UpdatePrisoner = () => {
  const [name, setname] = useState("");
  const [fathername, setfathername] = useState("");
  const [adharnum, setadharnum] = useState("");
  const [trialdate, settrialdate] = useState("");
  const [crime, setcrime] = useState("");
  const [witness, setwitness] = useState("");
  const [status, setstatus] = useState("");

  const handlesubmit = (e) => {
    e.preventDefault();
    try {
      axios
        .post(`${import.meta.env.VITE_DEV_URL}api/updatedpriosonerdets`, {
          name,
          fathername,
          adharnum,
          trialdate,
          crime,
          status,
          witness,
        })
        .then((res) => {
          console.log(res);
        });
    } catch (error) {
      console.error(error);
    }
  };

  const fetchprisoner = async () => {
    try {
      axios
        .get(`${import.meta.env.VITE_DEV_URL}api/getpriosonerdets/${adharnum}`)
        .then((res) => {
          console.log(res);
        });
    } catch (error) {}
  };

  return (
    <div className="body-container">
      <div className="container-ap ">
        <form onSubmit={handlesubmit} className="form-addprisoner">
          <h1 className="wel-message">UPDATE PRISONER DETAILS:</h1>

          <label id="name">Name of Miscreant</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setname(e.target.value)}
            placeholder="Rudranil Chowdhury"
          />
          <br />

          <label id="fathername">S/O</label>
          <input
            type="text"
            name="fathername"
            id="f-name"
            value={fathername}
            onChange={(e) => setfathername(e.target.value)}
            placeholder="Jagdish Chandra"
          />
          <br />

          <label id="aadhar">Aadhaar Number</label>
          <input
            type="text"
            name="aadharnum"
            id="aadhar"
            value={adharnum}
            onChange={(e) => setadharnum(e.target.value)}
            placeholder="#### #### ####"
          />

          <label id="trial">Trial</label>
          <input
            type="date"
            name="trialdate"
            id="trial"
            value={trialdate}
            onChange={(e) => settrialdate(e.target.value)}
            placeholder="MM/DD/YYYY"
          />
          <br />

          <label id="testimonial">Testimonial</label>
          <input
            type="text"
            name="testimonial"
            id="testimonal"
            value={witness}
            onChange={(e) => setwitness(e.target.value)}
            placeholder="I witnessed this person doing...."
          />
          <br />

          <label id="location">Status</label>
          <input
            list="location"
            name="location"
            value={status}
            onChange={(e) => setstatus(e.target.value)}
            placeholder="Location Status"
          />
          <br />

          <datalist id="location">
            <option value="In India"></option>
            <option value="Outside India"></option>
            <option value="Unknown"></option>{" "}
            {/*  in this case there will be instant bail cancellation */}
            <option value="Being Tracked"></option>{" "}
            {/*  in this case there will be instant bail cancellation */}
          </datalist>

          <label id="crime1">Crime</label>
          <input
            list="crime1"
            name="crime1"
            value={crime}
            onChange={(e) => setcrime(e.target.value)}
            placeholder="Crime Status"
          />
          <br />

          <datalist id="crime1">
            <option value="Cyber Crime"></option>
            <option value="Crime against SCs and STs"></option>
            <option value="Crime against Women"></option>
            <option value="Crime against Children"></option>
            <option value="Offenses against the state"></option>
            <option value="Economic Offenses"></option>
            <option value="Crime against Foreigners"></option>
            <option value="Others"></option>
          </datalist>

          <button type="submit" className="ap-button p-2">
            UpdatePrisoner
          </button>
        </form>
        {/* <button
          onClick={fetchprisoner}
          className="absolute top-[500px] left-[620px] w-15 ml-0.75 text-white bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-1.5 py-1.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          Fetch
        </button> */}
        <br />
      </div>
    </div>
  );
};

export default UpdatePrisoner;
