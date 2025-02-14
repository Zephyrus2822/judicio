import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import axios from "axios";
import video from "../assets/video2.mp4";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import App from "../App";

import emailjs from "@emailjs/browser";
import { useRef } from "react";
import Swal from "sweetalert2";
import { IoMdHelpCircleOutline } from "react-icons/io";

export default function Judgedashboard() {
  const [open, setOpen] = useState(false);

  const [applications, setapplications] = useState([]);
  const [Phone, setPhone] = useState("");
  const [message, setmessage] = useState("");
  const [applicationId, setapplicationId] = useState("")

  const handleClickOpen = (id) => {
    
    setOpen(true);
    setapplicationId(id);
    console.log(Phone);
  };

  // Function to close the dialog
  const handleClose = () => {
    setOpen(false);
  };

  const handleAccept = async () => {

    console.log(applicationId);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_DEV_URL}api/applications/accept`,
        { applicationId }
      );
      if (res) {
        console.log(res.data);
        Swal.fire({
          title: "Application accepted successfully",

          icon: "success",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlereject = async (applicationId) => {
    {
      /*handleClickOpen(application.applicantInfo.Phone)*/
    }
    console.log(applicationId);
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_DEV_URL}api/applications/reject`,
        { applicationId }
      );
      if (res) {
        console.log(res.data);
        Swal.fire({
          title: "Application rejected successfully",

          icon: "success",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

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

  const handlesubmit = async (e) => {
    e.preventDefault();
    handleClose();
    // try {
    //   axios.post()
    // } catch (error) {
    //   console.error(error);
    // }
    Swal.fire({
      title: "Message Sent Successfully",

      icon: "success",
      confirmButtonText: "OK",
    });
  };

  //sending email

  return (
    <div className='bg-gradient-to-br from-amber-200 to-orange-600 min-h-screen py-10 '>
      <div className="pt-20 pb-40">
        <div className=" text-center text-white mx-auto bg-slate-950 rounded-md p-5 opacity-70">
          <div className="flex justify-center items-center gap-10">
            <h1 className="text-3xl pt-10 pb-12 font-bold">
              Application Records
            </h1>
            <a
              href="/prevcases"
              className="text-2xl font-bold text-white flex justify-center items-center"
            >
              Help{" "}
              <span className="font-bold">
                <IoMdHelpCircleOutline />
              </span>
            </a>
          </div>
          <table className="w-full border-collapse">
            <thead className="text-2xl border-b border-orange-500">
              <tr className="">
                <th className="px-5 py-3">Application Id</th>
                <th className="px-5 py-3">Applicant Name</th>
                <th className="px-5 py-3">Crime</th>
                <th className="px-5 py-3">Lawyer Applied</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3"></th>
                <th className="px-5 py-3"> </th>
              </tr>
            </thead>
            <tbody className="text-xl font-semibold ">
              {applications.map((application, i) => (
                <tr className="border-b border-orange-500" key={i}>
                  <td className="px-5 py-3 text-center">{application._id}</td>
                  <td className="px-5 py-3 text-center">
                    {application.applicantInfo.Name}
                  </td>
                  <td className="px-5 py-3 text-center">
                    {application.applicantInfo.Crime[0]}
                  </td>
                  <td className="px-5 py-3 text-center">
                    {application.lawyerName}
                  </td>
                  <td className="px-8 py-3 text-center">
                    {application.Status}
                  </td>
                  {application.Status === "Pending" ? (
                    <td className="px-8 py-3 flex gap-4 justify-center">
                      <button
                        onClick={() => handleClickOpen(application._id)}
                        className="border-lime-100 bg-white text-green-700 px-2 py-1 mr-2 text-xl rounded-md "
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => handlereject(application._id)}
                        className="border-lime-100  bg-white text-red-600 px-2 py-1  text-xl rounded-md "
                      >
                        Reject
                      </button>
                    </td>
                  ) : null}
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
              <DialogTitle className="text-center">
                {"Enter Message"}
              </DialogTitle>
              <DialogContent>
                <form className="h-70 w-80 text-center" onSubmit={handleAccept}>
                  <textarea
                    className="text-2xl border-2 border-black px-2 py-2 rounded-md text-black"
                    placeholder="Enter the Message"
                    name="message"
                  />
                  <br />
                  <input
                    className="border-2 border-black text-black px-2 py-1 rounded-md my-1 "
                    type="date"
                    placeholder="DD-MM-YYYY "
                  />
                  <br />
                  <input
                    className="border-2 border-black px-2 py-1 text-xl "
                    type="submit"
                    value="Send"
                  />
                </form>
              </DialogContent>
              <DialogActions>
                {/* <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handlesubmit}>Submit</Button> */}
              </DialogActions>
            </Dialog>
          </React.Fragment>
        </div>
      </div>
    </div>
  );
}
