import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";
import "./fonts.css";
import video from '../assets/video2.mp4';

const Eligibility = () => {
  const [prisoners, setprisoners] = useState([])
  const [crimes, setcrimes] = useState([])
  

  const fetch=async()=>{
    try {
      const prisoners=await axios.get(`${import.meta.env.VITE_DEV_URL}api/prisoners/getprisoners`)
      console.log(prisoners)
      setprisoners(prisoners.data)

      const crimes=await axios.get(`${import.meta.env.VITE_DEV_URL}api/cases/crimes`)
      console.log(crimes)
      setcrimes(crimes.data);

    } catch (error) {
      console.error(error)
      
    }
  }

  useEffect(()=>{
    fetch()
  },[])

  

  return (
    <div className="video-container3">
      <video autoPlay muted loop className="video-background">
        <source src={video} type="video/mp4" />
      </video>
      <div className="body-container text-orange-400  relative z-10">
        <div className="p-10 text-center h-screen">
          <div className="border-2 border-orange-300 rounded-lg min-h-screen p-5 bg-opacity-70 bg-black mt-10">
            <h2 className="text-5xl font-semibold">Eligible Criminals for Bail</h2>
            <div className="mx-auto mt-10 ">
              <table className="space-x-5 ">
                <tr className="text-2xl space-x-2 space-y-7">
                  <th>Prisoner name</th>
                  <th>Adhar Num</th>
                  <th>Crime</th>
                  <th>Status</th>
                </tr>
                {prisoners.map((prison,i)=>(
                  <tr className="space-x-4" key={i}>
                    <td>{prison.Name}</td>
                    <td>{prison.AddharNum}</td>
                    <td>{prison.Crime}</td>
                    <td>{prison.Complience}</td>
                    <button className="bg-white text-green-500 text-xl px-2 py-1 ">Apply</button>
                  </tr>
                ))}
                
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Eligibility;
