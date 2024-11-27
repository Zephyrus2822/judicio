import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";
import "./fonts.css";
import video from '../assets/video2.mp4';

const Eligibility = () => {
  // State hooks to manage the data fetched from the API
  const [crimes, setcrimes] = useState([]); // List of available crimes
  const [criminals, setcriminals] = useState([]); // List of prisoners
  const [elegiblecriminals, setelegiblecriminals] = useState([]); // List of criminals eligible for bail
  const [diffdate, setdiffdate] = useState(""); // To store the difference in time between imprisonment and current date
  const [eligibilty, seteligibilty] = useState(""); // Eligibility status for bail (Yes/No)

  // Function to fetch list of criminals from the API
  const fetchcriminals = async () => {
    try {
      // Fetching criminal data from the API
      await axios
        .get(`${import.meta.env.VITE_DEV_URL}api/getprisonerdets`)
        .then((res) => {
          console.log("criminals", res.data); // Logging the fetched data
          setcriminals(res.data); // Setting the criminals data to state
        });
    } catch (error) {
      console.error("Server Error", error); // Handling any errors while fetching data
    }
  };

  // Function to fetch the list of crimes from the API
  const fetchCrimes = async (e) => {
    try {
      // Fetching crimes data from the API
      await axios
        .get(`${import.meta.env.VITE_DEV_URL}api/crimes`)
        .then((res) => {
          setcrimes(res.data); // Setting the crimes data to state
        });
    } catch (error) {
      console.error("Server Error", error); // Handling any errors while fetching data
    }
  };

  // Function to filter and calculate eligibility of criminals for bail based on the duration of their crime
  let eligiblecriminlass;

  const renderitems = () => {
    // Filtering criminals based on their eligibility for bail
    eligiblecriminlass = criminals.filter((criminal) => {
      const crimeDate = moment(criminal.createdAt).format("YYYY-MM-DD"); // Date of imprisonment
      let currentdate = moment().format("YYYY-MM-DD"); // Current date
      const diff = moment(crimeDate).to(currentdate, "months"); // Calculating the difference between current date and crime date in months
      setdiffdate(diff); // Updating the state with the date difference

      // Checking if the difference matches the crime duration to determine eligibility
      const crimesduration = crimes.filter((crime) => {
        if (diff === crime["duration"]) {
          seteligibilty("Yes"); // Eligible for bail if the duration matches
        } else {
          seteligibilty("NO"); // Not eligible for bail if the duration does not match
        }
      });

      // Returning the criminal object (you can modify this if needed to display specific details)
      return criminal;
    });

    // Setting the list of eligible criminals after filtering
    setelegiblecriminals(eligiblecriminlass);
    console.log("Eligible criminals:", eligiblecriminlass); // Logging the eligible criminals
    console.log("Eligibility Status:", eligibilty); // Logging the eligibility status
  };

  // useEffect hook to fetch data when the component is mounted or when the eligibility status changes
  useEffect(() => {
    const fetchData = async () => {
      await fetchCrimes(); // Fetch crimes data
      await fetchcriminals(); // Fetch criminals data
      renderitems(); // Render the filtered eligible criminals
    };
    fetchData(); // Call the fetchData function on component mount
  }, [elegiblecriminals]); // Dependency on elegiblecriminals state to trigger effect when eligibility changes

  return (
    <div className="video-container3">
      <video autoPlay muted loop className="video-background">
        <source src={video} type="video/mp4" />
      </video>
      <div className="body-container text-orange-400  relative z-10">
        <div className="p-10 text-center h-screen">
          <div className="border-2 border-orange-300 rounded-lg min-h-screen p-5 bg-opacity-70 bg-black mt-10">
            <h2 className="text-5xl font-semibold">Eligible Criminals for Bail</h2>
            <div className="mx-[500px] mt-10 ">
              {/* Below code is commented out for rendering a table, you can uncomment it to display eligible criminals */}
              {/* {elegiblecriminals.length >= 0 && (
                <div>
                  <table>
                    <thead>
                      <tr>
                        <th className="text-2xl text-white px-10 font-normal">Name</th>
                        <th className="text-2xl text-white px-10 font-normal">Crime</th>
                        <th className="text-2xl text-white px-10 font-normal">Aadhar Num</th>
                        {/* <th className="text-2xl text-nowrap px-10">Date of Imprisonment</th> 
                        <th className="text-2xl text-white font-normal px-10">Eligible for Bail</th>
                      </tr>
                    </thead>
                    <tbody>
                      {elegiblecriminals.map((criminal, i) => (
                        <tr key={i}>
                          <td>{criminal.Name}</td>
                          <td>{criminal.Crime}</td>
                          <td>{criminal.AddharNum}</td>
                          {/* <td>{moment(criminal.createdAt).format('YYYY-MM-DD')}</td> 
                          <td>{eligibilty}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Eligibility;
