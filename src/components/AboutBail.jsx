import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaArrowDown } from "react-icons/fa";

const AboutBail = () => {
  const [crimes, setCrimes] = useState([]);
  const [index, setindex] = useState(0);

  const fetchdata = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_DEV_URL}api/crimes`
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

  return (
    <main className="px-20 py-10">
      <h1 className="text-center text-2xl font-bold">Criminal Offenses </h1>
      <div className="crimes mt-5">
        <div className="offenses mb-5 text-xl font-semibold grid grid-cols-3 justify-center items-center">
          {crimebtn.map((crimebtnn, i) => {
            return (
              <div
                key={i}
                className="btn mb-5   bg-gradient-to-tr  from-blue-400 to-blue-700 w-fit px-2 py-1 text-white font-bold rounded-lg "
              >
                <button
                  className="flex justify-center items-center gap-2 hover:text-xl"
                  onClick={() => setindex(i)}
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

        <div className="  px-5 py-2 crimes">
          {crimes.map((crime, i) => (
            <div
              key={i}
              className="crime mb-10 border-[1px] p-3 space-y-2 rounded-lg  border-black"
              hidden={index + 1 !== crime.id}
            >
              <h2 className="text-2xl "> <span className="font-bold">Crime :</span>{crime.crime}</h2>
              <p className="text-xl">
                <span className="font-bold text-xl"> Section:</span>{" "}
                {crime.Section}
              </p>
              <p className="text-xl">
                <span className="font-bold text-xl">Bail Status:</span>{" "}
                {crime["Bail Status"]}
              </p>
              <p className="text-xl">
                <span className="font-bold text-xl">Bail Amount:</span>{" "}
                {crime["Bail Amount"]}
              </p>
              <p className="text-xl">
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
