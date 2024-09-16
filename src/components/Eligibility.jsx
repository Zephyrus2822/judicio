import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";
import "./fonts.css";

const Eligibility = () => {
  const [crimes, setcrimes] = useState([]);
  const [criminals, setcriminals] = useState([]);
  const [elegiblecriminals, setelegiblecriminals] = useState([]);
  const [diffdate, setdiffdate] = useState("");
  const [eligibilty, seteligibilty] = useState("")

  const fetchcriminals = async () => {
    try {
      await axios
        .get(`${import.meta.env.VITE_DEV_URL}api/getprisonerdets`)
        .then((res) => {
          console.log("criminals", res.data);
          setcriminals(res.data);
        });
    } catch (error) {
      console.error("Server Error", error);
    }
  };
  let eligiblecriminlass;
  const renderitems = () => {
     eligiblecriminlass = criminals.filter((criminal) => {
      const crimeDate = moment(criminal.createdAt).format("YYYY-MM-DD");
      console.log("Crime date", crimeDate);
      let currentdate = moment().format("YYYY-MM-DD");
      console.log("Current date", currentdate);
      const diff = moment(crimeDate).to(currentdate, "days");
      setdiffdate(diff);
      if (diff >= crimes["duration"]) {
        seteligibilty("Yes")
      }else{
        seteligibilty("NO")
      }
      console.log("difference bw dates", diffdate);
      return criminal;
    });
    console.log(eligiblecriminlass);
    setelegiblecriminals(eligiblecriminlass);
    console.log(elegiblecriminals);
  };

  const fetchCrimes = async (e) => {
    try {
      await axios
        .get(`${import.meta.env.VITE_DEV_URL}api/crimes`)
        .then((res) => {
          // console.log(res.data)
          setcrimes(res.data);
          // console.log(crimes)
        });
    } catch (error) {
      console.error("Server Error", error);
    }
  };

  useEffect(() => {
    fetchCrimes();
    fetchcriminals();
    renderitems();
  }, [elegiblecriminals]);

  return (
    <div className="p-10 text-center h-screen ">
      <h2 className="text-4xl">Eligible Criminals for Bail</h2>
      {/* ... other component content */}
      <div className="mx-[400px] mt-10">
        {elegiblecriminals.length >= 0 && (
          <div>
            <table>
              <thead>
                <tr>
                  <th className="text-2xl text-nowrap  px-10">Name</th>
                  <th className="text-2xl text-nowrap px-10 ">Crime</th>
                  {/* ... other relevant columns */}
                  <th className="text-2xl text-nowrap px-10 ">
                    Date of Imprisonment
                  </th>
                  <th className="text-2xl text-nowrap px-10 ">
                    Days Imprisoned
                  </th>
                  <th className="text-2xl text-nowrap px-10 ">
                    Eligible for Bail
                  </th>
                </tr>
              </thead>
              <tbody>
                {elegiblecriminals.map((criminal) => (
                  <tr key={criminal.id}>
                    <td>{criminal.Name}</td>
                    <td>{criminal.Crime}</td>
                    {/* ... other table data */}
                    <td>{moment(criminal.createdAt).format("YYYY-MM-DD")}</td>
                    <td>{diffdate}</td>
                    <td>{eligibilty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Eligibility;
