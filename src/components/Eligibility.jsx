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

  const handleApply=(applicationId)=>{
    console.log(applicationId)
    // TODO: send applicationId to backend for processing

  }
  

  return (
    <div className='bg-gradient-to-br from-amber-200 to-orange-600 min-h-screen py-10 '>
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
                  <th>Prison Duration</th>
                  <th></th>
                </tr>
                {prisoners.map((prison,i)=>(
                  <tr className="space-x-4" key={i}>
                    <td className="text-center">{prison.Name}</td>
                    <td className="text-center">{prison.AddharNum}</td>
                    <td className="text-center">{prison.Crime}</td>
                    <td className="text-center">{prison.Complience}</td>
                    <td className="text-center">{moment(prison.createdAt).format("mm")} Months</td>
                    <button onClick={()=>handleApply(prison._id)} className="bg-white text-green-500 text-xl px-2 py-1 ">Apply</button>
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
