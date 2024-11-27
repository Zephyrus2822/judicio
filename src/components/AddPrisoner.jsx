import React, { useState } from "react"; // Importing React and useState hook for state management
import "./addprisoner.css"; // Importing CSS for styling
import axios from "axios"; // Importing axios for making HTTP requests
import { useNavigate } from "react-router-dom"; // Importing useNavigate for navigation
import video from '../assets/video2.mp4'; // Importing video asset

const AddPrisoner = () => {
  // State variables for form fields
  const [name, setname] = useState("");
  const [fathername, setfathername] = useState("");
  const [adharnum, setadharnum] = useState("");
  const [trialdate, settrialdate] = useState("");
  const [crime, setcrime] = useState("");
  const [witness, setwitness] = useState("");
  const [status, setstatus] = useState("");

  const navigate = useNavigate(); // Hook for navigation

  // Function to handle form submission
  const handlesubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      axios
        .post(`${import.meta.env.VITE_DEV_URL}api/prisonerdets`, {
          // Replace this URL with ${import.meta.env.VITE_DEV_URL} before pushing to production
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
            // Navigate to update prisoner page if prisoner already exists
            navigate("/updateprisoner");
          }
          console.log(response);
          // Reset form fields
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
    <div className="video-container3">
      {/* Video background */}
      <video autoPlay muted loop className="video-background">
        <source src={video} type="video/mp4" />
      </video>

      <div className="flex justify-center items-center align-middle">
        {/* Form for adding a new prisoner */}
        <form onSubmit={handlesubmit} className="form-addprisoner-1">
          <h1 className="wel-message flex justify-center align-middle items-center">ENTER PRISONER DETAILS:</h1>

          {/* Name input field */}
          <label id="name">NAME</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setname(e.target.value)}
            placeholder="Rudranil Chowdhury"
          />
          <br />

          {/* Father's or Daughter's name input field */}
          <label id="fathername">S/O OR D/O</label>
          <input
            type="text"
            name="fathername"
            id="f-name"
            value={fathername}
            onChange={(e) => setfathername(e.target.value)}
            placeholder="Jagdish Chandra"
          />
          <br />

          {/* Aadhaar number input field */}
          <label id="aadhar">AADHAAR NUMBER</label>
          <input
            type="text"
            name="adharnum"
            id="aadhar"
            value={adharnum}
            onChange={(e) => setadharnum(e.target.value)}
            placeholder="#### #### ####"
          />
          <br />

          {/* Trial date input field */}
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

          {/* Testimonial input field */}
          <label id="testimonial">TESTIMONIAL</label>
          <input
            type="text"
            name="witness"
            id="testimonal"
            value={witness}
            onChange={(e) => setwitness(e.target.value)}
            placeholder="I witnessed this person doing...."
          />
          <br />

          {/* Status input field with datalist options */}
          <label id="location">STATUS</label>
          <input
            list="location"
            name="status"
            value={status}
            onChange={(e) => setstatus(e.target.value)}
            placeholder="Location Status"
          />
          <br />

          <datalist id="location">
            <option value="In India"></option>
            <option value="Outside India"></option>
            <option value="Unknown"></option> {/* In this case there will be instant bail cancellation */}
            <option value="Being Tracked"></option> {/* In this case there will be instant bail cancellation */}
          </datalist>

          {/* Crime input field with datalist options */}
          <label id="crime1">CRIME</label>
          <input
            list="crime1"
            value={crime}
            name="crime"
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

          {/* Submit button */}
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

export default AddPrisoner; // Exporting the AddPrisoner component
