import React, { useState } from "react";
import "./updateprisoner.css";
import axios from "axios";
import video from '../assets/video2.mp4';


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
        .post(`https://judicio-server.onrender.com/updatedpriosonerdets`, 
          {  //https://judicio-server.onrender.com/
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
    <div className="video-container3" >
      <video autoPlay muted loop className="video-background">
          <source src={video} type="video/mp4"/>
        </video>
    <div >
      
        <form onSubmit={handlesubmit} className="form-updateprisoner">
          <h1 className="welcumm-message">UPDATE PRISONER DETAILS:</h1>
          <label id="name">FULL NAME</label>
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

          <label id="aadhar">AADHAAR NUMBER</label>
          <input
            type="text"
            name="aadharnum"
            id="aadhar"
            value={adharnum}
            onChange={(e) => setadharnum(e.target.value)}
            placeholder="#### #### ####"
          />

          <label id="trial">TRIAL</label>
          <input
            type="date"
            name="trialdate"
            id="trial"
            value={trialdate}
            onChange={(e) => settrialdate(e.target.value)}
            placeholder="MM/DD/YYYY"
          />
          <br />

          <label id="testimonial">TESTIMONIAL</label>
          <input
            type="text"
            name="testimonial"
            id="testimonal"
            value={witness}
            onChange={(e) => setwitness(e.target.value)}
            placeholder="I witnessed this person doing...."
          />
          <br />

          <label id="location">STATUS</label>
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

          <label id="crime1">CONVICTED FOR:</label>
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

          <button type="submit" className="form-button">
            Update Prisoner
          </button>
        </form>
        {/* <button
          onClick={fetchprisoner}
          
        >
          Fetch
        </button> */}
        <br />
    </div>
    </div>
  );
};

export default UpdatePrisoner;
