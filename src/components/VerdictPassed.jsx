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
  return (
    <div className="video-container">
      <video autoPlay muted loop className="video-background">
        <source src={video} type="video/mp4" />
      </video>
      <div className='p-10 '>
      <div className="table text-center text-white mx-auto bg-slate-950 rounded-md p-5">
        <h1 className='text-3xl p-5'>Application Records</h1>
        <table>
          <thead className='text-2xl '>
            <tr className=''>
              <th className='px-5'>Application Id</th>
              <th className='px-5'>Applicant Name</th>
              <th className='px-5'>Crime</th>
              <th className='px-5'>Lawyer Applied</th>
              <th className='px-8'>Status</th>
            </tr>
          </thead>
          <tbody className='text-xl font-semibold'>
            <tr>
              <td>45646464654</td>
              <td>Anuska Biswas</td>
              <td>Defamation</td>
              <td>Abdul Rehman</td>
              <td>Applied</td>
            </tr>
          </tbody>
        </table>
      </div>
      </div>
    </div>
  )
}

export default VerdictPassed