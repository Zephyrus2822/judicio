import React, { useEffect, useState } from "react"; // Importing React and useState hook for state management
import "./addprisoner.css"; // Importing CSS for styling
import axios from "axios"; // Importing axios for making HTTP requests
import { useNavigate } from "react-router-dom"; // Importing useNavigate for navigation
import video from '../assets/video2.mp4'; // Importing video asset
import Swal from 'sweetalert2'

const AddPrisoner = () => {

  //for information storing
  const [crimeList, setcrimeList] = useState([])

  // State variables for form fields
  const [Name, setName] = useState("");
  const [Fname, setFname] = useState("");
  const [adharnum, setadharnum] = useState("");
  const [firdate, setfirdate] = useState("");

  const [Phone, setPhone] = useState("")
  const [Address, setAddress] = useState("")
  const [crimecat, setcrimecat] = useState("")
  
  const [crime, setcrime] = useState("");
  const [witness, setwitness] = useState("");
  // const [status, setstatus] = useState("");

  const navigate = useNavigate(); // Hook for navigation

  // Name, Fname, adharnum, firdate, Address, Phone, witness, crime

  const fetchdata=async()=>{
    try {
      const crimes=await axios.get(`${import.meta.env.VITE_DEV_URL}api/cases/crimes`)
      // console.log(crimes)
      setcrimeList(crimes.data)
    } catch (error) {
      console.error(error)
    }
  }

  const crimeCategory=[
    "Offence Against Women",
    "Offence Against Children",
    "Offence Against Persons",
    "Offence Against the State",
    "Offence Against Property",
    "Offence Relating to Marriage and Family",
    "Offenses Against Foreigners",
    "Economic Offenses"
  ]

  useEffect(()=>{
    fetchdata()
  },[])

  const crimess=crimeList.filter(crime=>crime.CrimeCategory===crimecat)
  // console.log(crimess)
  
  // Function to handle form submission
  const handlesubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      axios
        .post(`${import.meta.env.VITE_DEV_URL}api/prisoners/addprisoner`, {
          // Replace this URL with ${import.meta.env.VITE_DEV_URL} before pushing to production
          Name, Fname, adharnum, firdate, Address, Phone, witness, crime
        })
        .then((response) => {
          console.log(response)
          if (response.data === "Prisoner added successfully") {
            // Navigate to update prisoner page if prisoner already exists
            Swal.fire({
              title:response.data,
              icon:"success",

            })
          }else{
            // navigate("/updateprisoner");

          }
          console.log(response);
          // Reset form fields
          // setName("");
          // setFname("");
          // setadharnum("");
          // setfirdate("");
          // setcrime("");
          // setstatus("");
          // setwitness("");
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
          <label id="Name">Name</label>
          <input
            type="text"
            Name="Name"
            id="Name"
            value={Name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Rudranil Chowdhury"
          />
          <br />

          {/* Father's or Daughter's Name input field */}
          <label id="Fname">S/O OR D/O</label>
          <input
            type="text"
            Name="Fname"
            id="f-Name"
            value={Fname}
            onChange={(e) => setFname(e.target.value)}
            placeholder="Jagdish Chandra"
          />
          <br />

          {/* Aadhaar number input field */}
          <label id="aadhar">AADHAAR NUMBER</label>
          <input
            type="text"
            Name="adharnum"
            id="aadhar"
            value={adharnum}
            onChange={(e) => setadharnum(e.target.value)}
            placeholder="#### #### ####"
          />
          <label id="Address">Address</label>
          <input
            type="text"
            Name="Address"
            id="Address"
            value={Address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder=""
          />
          <br />

          {/* Trial date input field */}
          <label id="trial">FIR Date</label>
          <input
            type="date"
            Name="firdate"
            id="trial"
            value={firdate}
            onChange={(e) => setfirdate(e.target.value)}
            placeholder="MM/DD/YYYY"
          />
          <br />

          {/* Testimonial input field */}
          <label id="testimonial">TESTIMONIAL</label>
          <input
            type="text"
            Name="witness"
            id="testimonal"
            value={witness}
            onChange={(e) => setwitness(e.target.value)}
            placeholder="I witnessed this person doing...."
          />
          <br />

          {/* Status input field with datalist options */}
          <label htmlFor="">Phone</label>
          <input type="text" value={Phone}  onChange={e=>setPhone(e.target.value)}/>

          {/* crimeCategory */}

          <label htmlFor="">Crime Category</label>
          <select value={crimecat} onChange={e=>setcrimecat(e.target.value)}>
            <option value="">Select Crime Category</option>
            {crimeCategory.map(cat=><option key={cat}>{cat}</option>)}
          </select>

          {/* Crime input field with datalist options */}
          <label id="crime1">CRIME</label>
          <select name="" value={crime} onChange={e=>setcrime(e.target.value)} id="">
            <option value="">Select Crime</option>
            {crimess.map((crimee,i)=><option key={i}>{crimee.Crime}</option>)}
          </select>

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
