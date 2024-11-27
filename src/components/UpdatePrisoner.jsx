import React, { useState } from "react";
import "./updateprisoner.css";
import axios from "axios";
import video from '../assets/video2.mp4'; // Importing background video
import ContactUs from './ContactUs' // Importing a Contact Us component (though not used in this code)

const UpdatePrisoner = () => {
  // State hooks to manage form data
  const [name, setname] = useState(""); // Full name of the prisoner
  const [fathername, setfathername] = useState(""); // Father's name of the prisoner
  const [adharnum, setadharnum] = useState(""); // Aadhar number of the prisoner
  const [trialdate, settrialdate] = useState(""); // Trial date
  const [crime, setcrime] = useState(""); // Type of crime the prisoner was convicted for
  const [witness, setwitness] = useState(""); // Testimonial or witness statement
  const [status, setstatus] = useState(""); // Current status of the prisoner

  // Handles form submission when the user clicks the "Update Prisoner" button
  const handlesubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      // Sending a POST request to update prisoner details
      axios
        .post(`https://judicio-server.onrender.com/updatedpriosonerdets`, {
          // API endpoint to update prisoner details
          name,
          fathername,
          adharnum,
          trialdate,
          crime,
          status,
          witness,
        })
        .then((res) => {
          console.log(res); // Log the response after successful submission
        });
    } catch (error) {
      console.error(error); // Log any errors that occur during the API call
    }
  };

  // Fetches prisoner details based on their Aadhar number (not currently used in the form)
  const fetchprisoner = async () => {
    try {
      // Sending a GET request to fetch prisoner details using the Aadhar number
      axios
        .get(`${import.meta.env.VITE_DEV_URL}api/getpriosonerdets/${adharnum}`)
        .then((res) => {
          console.log(res); // Log the response from the API
        });
    } catch (error) {
      console.error("Error fetching prisoner details:", error); // Log any errors during the fetch process
    }
  };

  return (
    <>
      {/* Video background */}
      <div className="video-container3">
        <video autoPlay muted loop className="video-background">
          <source src={video} type="video/mp4" />
        </video>
        
        {/* Main content container */}
        <div>
          {/* Form container */}
          <div className="flex justify-center items-start align-middle mb-60">
            <form onSubmit={handlesubmit} className="form-updateprisoner">
              {/* Form title */}
              <h1 className="welcumm-message flex justify-center align-middle items-center">UPDATE PRISONER DETAILS:</h1>

              {/* Full Name input */}
              <label id="name">FULL NAME</label>
              <input
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setname(e.target.value)} // Update state with input value
                placeholder="Anuska Biswas"
              />
              <br />

              {/* Father's Name input */}
              <label id="fathername">S/O</label>
              <input
                type="text"
                name="fathername"
                id="f-name"
                value={fathername}
                onChange={(e) => setfathername(e.target.value)} // Update state with input value
                placeholder="Jagdish Chandra"
              />
              <br />

              {/* Aadhar Number input */}
              <label id="aadhar">AADHAAR NUMBER</label>
              <input
                type="text"
                name="aadharnum"
                id="aadhar"
                value={adharnum}
                onChange={(e) => setadharnum(e.target.value)} // Update state with input value
                placeholder="#### #### ####"
              />

              {/* Trial Date input */}
              <label id="trial">TRIAL</label>
              <input
                type="date"
                name="trialdate"
                id="trial"
                value={trialdate}
                onChange={(e) => settrialdate(e.target.value)} // Update state with input value
                placeholder="MM/DD/YYYY"
              />
              <br />

              {/* Witness Testimonial input */}
              <label id="testimonial">TESTIMONIAL</label>
              <input
                type="text"
                name="testimonial"
                id="testimonal"
                value={witness}
                onChange={(e) => setwitness(e.target.value)} // Update state with input value
                placeholder="I witnessed this person doing...."
              />
              <br />

              {/* Location Status input */}
              <label id="location">STATUS</label>
              <input
                list="location"
                name="location"
                value={status}
                onChange={(e) => setstatus(e.target.value)} // Update state with input value
                placeholder="Location Status"
              />
              <br />

              {/* Predefined list for location status */}
              <datalist id="location">
                <option value="In India"></option>
                <option value="Outside India"></option>
                <option value="Unknown"></option>
                <option value="Being Tracked"></option> {/* Bail is canceled if the status is "Being Tracked" */}
              </datalist>

              {/* Crime Conviction input */}
              <label id="crime1">CONVICTED FOR:</label>
              <input
                list="crime1"
                name="crime1"
                value={crime}
                onChange={(e) => setcrime(e.target.value)} // Update state with input value
                placeholder="Crime Status"
              />
              <br />

              {/* Predefined list for crime types */}
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

              {/* Submit button to update prisoner details */}
              <button type="submit" className="form-button">
                Update Prisoner
              </button>
            </form>
          </div>

          {/* Fetch button (currently not used, but you can uncomment to fetch prisoner details by Aadhar number) */}
          {/* <button onClick={fetchprisoner}>Fetch</button> */}
        </div>
      </div>
    </>
  );
};

export default UpdatePrisoner;
