import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaArrowDown } from "react-icons/fa";
import video2 from "../assets/video2.mp4";

/**
 * AboutBail component - Renders a page with a video background and displays
 * criminal offenses with related bail information.
 * @returns {JSX.Element} The AboutBail component.
 */
const AboutBail = () => {
  // State to hold the list of crimes fetched from the API
  const [crimes, setCrimes] = useState([]);
  // State to hold the index of the currently selected crime
  const [index, setindex] = useState(0);
  // State to hold the index of the currently active button
  const [activeButton, setActiveButton] = useState(null);

  /**
   * Fetches the list of crimes from the API and updates the crimes state.
   */
  const fetchdata = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_DEV_URL}api/crimes` // replace ${import.meta.env.VITE_DEV_URL} with below before pushing
        //https://judicio-server.onrender.com/
      );
      console.log(response.data);
      setCrimes(response.data);
      console.log(crimes);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchdata();
  }, []);

  // List of crime categories for the buttons
  const crimebtn = [
    "Offences Against Womens",
    "Offenses Against Children",
    "Offenses Against Persons",
    "Offenses Against the State",
    "Offenses Against Property",
    "Offenses Relating to Marriage and Family",
  ];

  /**
   * Handles the click event of the crime category buttons.
   * @param {number} i - The index of the clicked button.
   */
  const handleButtonClick = (i) => {
    setindex(i);
    setActiveButton(i);
  };

  return (
    <>
      {/* Video background container */}
      <div className="video-container2">
        <video autoPlay muted loop className="video-background">
          <source src={video2} type="video/mp4" />
        </video>

        {/* Page title */}
        <h1 className="text-center text-5xl text-orange-500 font-bold mt-4 mb-2 p-4">Criminal Offenses</h1>

        {/* Crime category buttons */}
        <div className="crimes mt-5">
          <div className="mb-5 text-xl font-semibold grid grid-cols-3 justify-center items-center">
            {crimebtn.map((crimebtnn, i) => {
              return (
                <div
                  key={i}
                  className={`bailbtn bailbtn-2 mb-5 w-fit p-2 m-2 text-white font-normal rounded-lg ${activeButton === i ? 'active' : ''}`}
                >
                  <button
                    className="flex justify-center items-center gap-2"
                    onClick={() => handleButtonClick(i)}
                  >
                    {crimebtnn}
                    <span className="bg-white text-black p-1 rounded-full">
                      <FaArrowDown />
                    </span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Crime details */}
          <div className="justify-center">
            <div
              className="crime-list-container"
              style={{
                minHeight: '1500px', // Adjust the height as needed
                overflowY: 'scroll', // Enables vertical scrollbar
                paddingRight: '10px', // Optional: adds some space for better look with the scrollbar
              }}
            >
              {crimes.map((crime, i) => (
                <div
                  key={i}
                  className="crime mb-10 border-[1px] p-3 space-y-2 rounded-lg border-black"
                  style={{
                    background: 'rgba(0, 0, 0, 0.5)',
                    border: '1px solid orange',
                    padding: '2rem',
                    width: '75%',
                    marginLeft: '200px',
                  }}
                  hidden={index + 1 !== crime.id}
                >
                  <h2 className="text-xl text-gray-200">
                    <span className="font-normal">Crime :</span> {crime.crime}
                  </h2>
                  <p className="text-xl text-gray-200">
                    <span className="font-normal text-xl">Section:</span> {crime.Section}
                  </p>
                  <p className="text-xl text-gray-200">
                    <span className="font-normal">Bail Status:</span> {crime["Bail Status"]}
                  </p>
                  <p className="text-xl text-gray-200">
                    <span className="font-normal">Bail Amount:</span> {crime["Bail Amount"]}
                  </p>
                  <p className="text-xl text-gray-200">
                    <span className="font-normal">Duration:</span> {crime["duration"]}
                  </p>
                  <p className="text-xl text-gray-200">
                    <span className="font-normal">Criteria:</span> {crime.Criteria}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default AboutBail;
