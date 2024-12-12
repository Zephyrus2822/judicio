import React, { useEffect, useState } from "react";
import "./updateprisoner.css";
import axios from "axios";
import video from '../assets/video2.mp4'; // Importing background video
import ContactUs from './ContactUs' // Importing a Contact Us component (though not used in this code)
import { FaCloudUploadAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const UpdatePrisoner = () => {
  // State hooks to manage form data
  const [name, setname] = useState(""); // Full name of the prisoner
  const [fathername, setfathername] = useState(""); // Father's name of the prisoner
  const [adharnum, setadharnum] = useState(""); // Aadhar number of the prisoner
  const [trialdate, settrialdate] = useState(""); // Trial date
  const [crime, setcrime] = useState(""); // Type of crime the prisoner was convicted for
  const [isuploading, setisuploading] = useState(false)
  
  const [adharimage, setadharimage] = useState("")
  const [enquiryimageurl, setenquiryimageurl] = useState("")

  const [crimes, setcrimes] = useState([])

  // Handles form submission when the user clicks the "Update Prisoner" button
  const handlesubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      // Sending a POST request to update prisoner details
      axios
        .post(`${import.meta.env.VITE_DEV_URL}api/prisoners/updateprisoners`, {
          // API endpoint to update prisoner details
          adharnum,
          enquiryimageurl,
        })
        .then((res) => {
          if(res.data==="Enquiry Report updated successfully"){
            Swal.fire({
              title: "Enquiry Report Updated Successfully",
              text: "Your enquiry report has been updated successfully. You will receive a confirmation via email shortly.",
              icon: "success",
              confirmButtonText: "Close",
            })
          }
          console.log(res); // Log the response after successful submission
        });
    } catch (error) {
      console.error(error); // Log any errors that occur during the API call
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

      setenquiryimageurl(res.data.url);
      //   console.log(res.data.url);
      // Toast.success()
      alert("image uploaded successfully");
      setisuploading(false);
    } catch (error) {
      console.error("An error occurred while uploading", error);
    }
  };


  // Fetches prisoner details based on their Aadhar number (not currently used in the form)
  const fetchprisoner = async () => {
    try {
      // Sending a GET request to fetch prisoner details using the Aadhar number
      await axios
        .get(`${import.meta.env.VITE_DEV_URL}api/prisoners/getprisoners`)
        .then((res) => {
          console.log(res); // Log the response from the API
        });

        const crimes=await axios.get(`${import.meta.env.VITE_DEV_URL}api/cases/crimes`)
      console.log(crimes)
      setcrimes(crimes.data);
    } catch (error) {
      console.error("Error fetching prisoner details:", error); // Log any errors during the fetch process
    }
  };
  useEffect(()=>{
    fetchprisoner()
  },[])

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
              <div className="border-2 flex justify-center px-2 items-center border-white rounded-lg gap-2 py-2">
                  <label className=" text-white h-12 mr-5 p-1">
                    Add Enquiry Report
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

              

              

              
              

              {/* Submit button to update prisoner details */}
              <button type="submit" className="form-button mx-[500px]">
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
