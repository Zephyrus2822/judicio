import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaArrowDown } from "react-icons/fa";
import "./aboutbail.css";

const AboutBail = () => {
  const [crimes, setCrimes] = useState([]);
  const [index, setIndex] = useState(0);
  const [activeButton, setActiveButton] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_DEV_URL}getcrimes`
      );
      console.log(response.data);
      setCrimes(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const crimebtn = [
    "Offences Against Womens",
    "Offenses Against Children",
    "Offenses Against Persons",
    "Offenses Against the State",
    "Offenses Against Property",
    "Offenses Relating to Marriage and Family",
  ];

  const handleButtonClick = (i) => {
    setIndex(i);
    setActiveButton(i);
  };

  const isValidArray = Array.isArray(crimes);

  return (
    <>
      <div className='bg-gradient-to-br from-amber-200 to-orange-600 min-h-screen py-10 '>
        

        <h1 className="text-center text-5xl text-orange-500 font-bold mt-4 mb-2 p-4">
          Criminal Offenses
        </h1>

        <div className="crimes mt-5 ">
          <div className="bailbtn-container">
            {crimebtn.map((crimebtnn, i) => {
              return (
                <div
                  key={i}
                  className={`bailbtn-2 mb-5 p-2 m-2 text-white font-normal rounded-lg ${activeButton === i ? "active" : ""}`}
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

          <div className="justify-center">
            <div
              className="crime-list-container h-[30vh]"
              
            >
              {crimes.length > 0
                ? crimes.map((crime, i) => (
                    <div
                      key={i}
                      className="crime mb-10 border-[1px] p-3 space-y-2 rounded-lg border-black"
                      style={{
                        background: "rgba(0, 0, 0, 0.5)",
                        border: "1px solid orange",
                        padding: "2rem",
                        width: "75%",
                        marginLeft: "200px",
                      }}
                      hidden={index + 1 !== crime.id}
                    >
                      <h2 className="text-xl text-gray-200">
                        <span className="font-normal">Crime:</span> {crime.crime}
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
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutBail;
