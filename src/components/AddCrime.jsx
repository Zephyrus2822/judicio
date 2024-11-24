import React, { useState } from "react";
import "./addcrime.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import video from '../assets/video2.mp4';

const AddCrime = () => {
  const [name, setname] = useState("");
  const [fathername, setfathername] = useState("");
  const [adharnum, setadharnum] = useState("");
  const [trialdate, settrialdate] = useState("");
  const [crime, setcrime] = useState("");
  const [witness, setwitness] = useState("");
  const [status, setstatus] = useState("");

  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    try {
      axios
        .post(`${import.meta.env.VITE_DEV_URL}api/prisonerdets`, {
          //replace this URL with ${import.meta.env.VITE_DEV_URL} before pushing
          name,
          fathername,
          adharnum,
          trialdate,
          crime,
          status,
          witness,
        })
        .then((response) => {
          if (response.data === "Prisoner already exists") {
            // setuserstatus("Prisoner already exists");
            navigate("/updateprisoner");
          }
          console.log(response);
          setname("");
          setfathername("");
          setadharnum("");
          settrialdate("");
          setcrime("");
          setstatus("");
          setwitness("");
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="video-container3" >
       <video autoPlay muted loop className="video-background">
          <source src={video} type="video/mp4"/>
        </video>
  
        <div className="flex justify-center items-center align-middle">
        <form onSubmit={handlesubmit} className="form-addprisoner-1">
          <h1 className="wel-message flex justify-center align-middle items-center">ADD NEW CRIME</h1>

          <label id="name">Crime</label>
          <input
           
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setname(e.target.value)}
            placeholder="Rudranil Chowdhury"
          />
          <br />

          <label id="fathername">Section</label>
          <input
            type="text"
            name="fathername"
            id="f-name"
            value={fathername}
            onChange={(e) => setfathername(e.target.value)}
            placeholder="Jagdish Chandra"
          />
          <br />

          <label id="aadhar">Minimum Prison Duration</label>
          <input
            type="text"
            name="adharnum"
            id="aadhar"
            value={adharnum}
            onChange={(e) => setadharnum(e.target.value)}
            placeholder="#### #### ####"
          />
          <br />


          <label id="testimonial">Bail Amounts</label>
          <input
            type="text"
            name="witness"
            id="testimonal"
            value={witness}
            onChange={(e) => setwitness(e.target.value)}
            placeholder="I witnessed this person doing...."
          />
          <br />

          <label id="location">Bail Condition</label>
          <input
            list="location"
            name="status"
            value={status}
            onChange={(e) => setstatus(e.target.value)}
            placeholder="Conditions to be bailable"
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

          <label htmlFor="crime-select my-2 p-2">Crime Category</label>
      <select
      className="ml-3"
        id="crime-select"
        value={crime}
        name="crime"
        onChange={(e) => setCrime(e.target.value)}
        placeholder="Crime Status"
      >
        <option value="" disabled hidden>Choose a crime category...</option>
        <option value="Cyber Crime">Cyber Crime</option>
        <option value="Crime against SCs and STs">Crime against SCs and STs</option>
        <option value="Crime against Women">Crime against Women</option>
        <option value="Crime against Children">Crime against Children</option>
        <option value="Offenses against the state">Offenses against the state</option>
        <option value="Economic Offenses">Economic Offenses</option>
        <option value="Crime against Foreigners">Crime against Foreigners</option>
        <option value="Others">Others</option>
      </select>
      <br />
          <button
            type="submit"

            className="form-button">

            Add Prisoner
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCrime;