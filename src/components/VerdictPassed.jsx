import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import axios from 'axios';
import video from '../assets/video2.mp4';


const VerdictPassed = () => {
  const [applications, setapplications] = useState([])

  const fetchdata = async () => {
    try {
      const application = await axios.get(
        `${import.meta.env.VITE_DEV_URL}api/applications/getapplications`
      );
      console.log(application.data);
      setapplications(application.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);
  

  return (
    <div className='bg-gradient-to-br from-amber-200 to-orange-600 min-h-screen py-10 '>

      <div className="pt-20 pb-40">
      <div className=" text-center text-white mx-auto bg-slate-950 rounded-md p-5 opacity-70">
        <h1 className="text-3xl pt-10 pb-12 font-bold">Application Records</h1>
        <table className="w-full border-collapse">
          <thead className="text-2xl border-b border-orange-500">
            <tr className=''>
              <th className="px-5 py-3">Application Id</th>
              <th className="px-5 py-3">Applicant Name</th>
              <th className="px-5 py-3">Crime</th>
              <th className="px-5 py-3">Lawyer Applied</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody className='text-xl font-semibold'>
            {applications.map((application,i)=>(
              <tr className="border-b border-orange-500">
                <td className="px-5 py-3 text-center">{application._id}</td>
                <td className="px-5 py-3 text-center">{application.applicantInfo.Name}</td>
                <td className="px-5 py-3 text-center">{application.applicantInfo.Crime[0]}</td>
                <td className="px-5 py-3 text-center">{application.lawyerName}</td>
                <td className="px-5 py-3 text-center">{application.Status}</td>
              </tr>
            ))}
            
          </tbody>
        </table>
      </div>
      </div>
    </div>
  )
}

export default VerdictPassed