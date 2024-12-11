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

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import App from '../App';


export default function Judgedashboard() {

  const [open, setOpen] = useState(false);

  const [applications, setapplications] = useState([])

  const handleClickOpen = () => {
    setOpen(true);
  };

  // Function to close the dialog
  const handleClose = () => {
    setOpen(false);
  };

  const fetchdata=async()=>{
    try {
      const application=await axios.get(`${import.meta.env.VITE_DEV_URL}api/applications/getapplications`)
      console.log(application.data)
      setapplications(application.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(()=>{
    fetchdata()
  },[])

  const handlesubmit=(e)=>{
    e.prevnentDefault()
  }
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
          <tbody className='text-xl font-semibold '>
            
              {applications.map((application,i)=>(
                <tr>
              <td>{application._id}</td>
              <td>{application.applicantInfo.Name}</td>
              <td>{application.applicantInfo.Crime[0]}</td>
              <td>{application.lawyerName}</td>
              <td>{application.Status}</td>
              <button onClick={handleClickOpen} className="border-lime-100 bg-white text-green-700 px-2 py-1 mr-2 text-xl rounded-md ">Accept</button>
              <button onClick={handleClickOpen} className="border-lime-100  bg-white text-red-600 px-2 py-1  text-xl rounded-md ">Reject</button>
              </tr>
              ))}
            
          </tbody>
        </table>

        <React.Fragment>
        <Dialog
          open={open}
          // TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          
          <DialogTitle>{"Enter Message"}</DialogTitle>
          <DialogContent>
            <form action="" onSubmit={handlesubmit}>
              {/* <label htmlFor="">Enter Message</label> */}
              <br />
              <input className='border-black px-2 py-1 rounded-md' type="text" placeholder='Enter the message for accepting or rejecting' />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handlesubmit}>Submit</Button>
            
          </DialogActions>
        </Dialog>
      </React.Fragment>
      </div>
      </div>
    </div>
  );
}
