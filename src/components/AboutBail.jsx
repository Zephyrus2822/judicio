import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaArrowDown } from "react-icons/fa";

const AboutBail = () => {
  const [crimes, setCrimes] = useState([]);
  const [index, setindex] = useState(0);
  const [activeButton, setActiveButton] = useState(null);

  const fetchdata = async () => {
    try {
      const response = await axios.get(
        `https://judicio-server.onrender.com/api/crimes` // replace URL with ${import.meta.env.VITE_DEV_URL} before pushing
      );
      console.log(response.data);
      setCrimes(response.data);
      console.log(crimes);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchdata();
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
    setindex(i);
    setActiveButton(i);
  };

  return (
    <main
      className="px-20 py-10"
      style={{
        backgroundImage: `url('/images/bgv4.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backdropFilter: 'blur(40px)',
        
      }}
    >
      <h1 className="text-center text-2xl font-bold">Criminal Offenses</h1>
      <div className="crimes mt-5">
        <div className="offenses mb-5 text-xl font-semibold grid grid-cols-3 justify-center items-center">
          {crimebtn.map((crimebtnn, i) => {
            return (
              <div
                key={i}
                className={`btn mb-5 w-fit px-2 py-1 text-white font-bold rounded-lg ${
                  activeButton === i
                    ? "bg-gradient-to-tr from-green-400 to-green-700"
                    : "bg-gradient-to-tr from-blue-400 to-blue-700"
                }`}
              >
                <button
                  className="flex justify-center items-center gap-2 hover:text-xl"
                  onClick={() => handleButtonClick(i)}
                >
                  {crimebtnn}{" "}
                  <span className="bg-white text-black p-1 rounded-full">
                    <FaArrowDown />
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        <div className="px-5 py-2 crimes">
          {crimes.map((crime, i) => (
            <div
              key={i}
              className="crime mb-10 border-[1px] p-3 space-y-2 rounded-lg border-black"
              style={{
                background: 'rgba(255, 255, 255, 0.3)',
                borderRadius: '10px',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                border: '5px ridge rgba(255, 255, 255, 0.5)',
              }}
              hidden={index + 1 !== crime.id}
            >
              <h2 className="text-xl text-white">
                <span className="font-bold">Crime :</span>
                {crime.crime}
              </h2>
              <p className="text-xl text-white">
                <span className="font-bold text-xl"> Section:</span>{" "}
                {crime.Section}
              </p>
              <p className="text-xl text-white">
                <span className="font-bold text-xl">Bail Status:</span>{" "}
                {crime["Bail Status"]}
              </p>
              <p className="text-xl text-white">
                <span className="font-bold text-xl">Bail Amount:</span>{" "}
                {crime["Bail Amount"]}
              </p>
              <p className="text-xl text-white">
                <span className="font-bold text-xl">Criteria:</span>{" "}
                {crime.Criteria}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default AboutBail;