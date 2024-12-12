import React, { useState } from "react"; // Importing React and useState hook for state management
import "./addcrime.css"; // Importing CSS for styling
import axios from "axios"; // Importing axios for making HTTP requests
import { useNavigate } from "react-router-dom"; // Importing useNavigate for navigation
import video from '../assets/video2.mp4'; // Importing video asset

const AddCrime = () => {
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
          // replace this URL with ${import.meta.env.VITE_DEV_URL} before pushing
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
    <div className='bg-gradient-to-br from-amber-200 to-orange-600 min-h-screen py-10 '>
      {/* Video background */}

      <div className="flex justify-center items-center align-middle">
        {/* Form for adding a new crime */}
        <form onSubmit={handlesubmit} className="form-addprisoner-1">
          <h1 className="wel-message flex justify-center align-middle items-center">ADD NEW CRIME</h1>

          {/* Crime input field */}
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

          {/* Section input field */}
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

          {/* Minimum Prison Duration input field */}
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

          {/* Bail Amounts input field */}
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

          {/* Bail Condition input field with datalist options */}
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
            <option value="Unknown"></option> {/* In this case there will be instant bail cancellation */}
            <option value="Being Tracked"></option> {/* In this case there will be instant bail cancellation */}
          </datalist>

          {/* Crime Category dropdown */}
          <label htmlFor="crime-select my-2 p-2">Crime Category</label>
          <select
            className="ml-3"
            id="crime-select"
            value={crime}
            name="crime"
            onChange={(e) => setcrime(e.target.value)}
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

          {/* Submit button */}
          <button type="submit" className="form-button">Add Prisoner</button>
        </form>
      </div>
    </div>
  );
};

export default AddCrime; // Exporting the AddCrime component
