import axios from "axios";
import React, { useEffect, useState } from "react";
import video3 from '../assets/video2.mp4';

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import Slide from '@mui/material/Slide';
// import { TransitionProps } from '@mui/material/transitions';

const Dashboard = () => {
  const [open, setOpen] = useState(false);

  // const usertype = window.localStorage.getItem("usertype");

  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const isPasswordValid = password.length >= 6;
  const [signingUp, setsigningUp] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [users, setusers] = useState([]);
  const fetchUsers = async () => {
    await axios
      .get(`${import.meta.env.VITE_DEV_URL}api/users`)
      //https://judicio-server.onrender.com/
      .then((res) => {
        console.log(res);
        setusers(res.data);
      })
      .catch((err) => {
        console.error("Server Error", err);
      });
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  const handlesubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${import.meta.env.VITE_DEV_URL}api/signupAdmin`, {
        username,
        email,
        password,
      })
      .then((response) => {
        console.log(response);
       
        window.location.reload();
      })
      .catch((err) => console.error("Server Error", err));
  };

  return (
    <div className="video-container3">
      <video
        autoPlay
        muted
        loop
        className="video-background"
      >
        <source src={video3} type="video/mp4" />
      </video>
      <div className="relative w-full z-10 ">
        <div className="cards ml-[220px] flex justify-start items-center">
          <div className="dashboard-btn">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8 text-orange-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                />
              </svg>
            </span>
            <h2 >Users: {users.length}</h2>
          </div>
          <button
            onClick={handleClickOpen}
            className="cards ml-[370px] flex justify-start items-center"
          >
            <div className="dashboard-btn-1 ">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-8 text-orange-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                  />
                </svg>
              </span>
              <h2 >Add Users</h2>
            </div>
          </button>
        </div>

        <div className="dashboard-conatiner border-2 bg-opacity-30 rounded-lg backdrop-blur-lg min-h-[40vh] w-[60vw] ml-[300px] p-10 flex justify-center items-center shadow-[0_4px_30px_rgba(255,69,0,0.9)]">
          <div className="w-full">
            <table className="w-full">
              <thead>
                <tr className="border-b-2">
                  <th className="px-5 text-2xl text-center w-1/3 text-orange-500">Name</th>
                  <th className="px-5 text-2xl text-center w-1/3 text-orange-500">Email</th>
                  <th className="px-5 text-2xl text-center w-1/3 text-orange-500">User Type</th>
                </tr>
              </thead>
              <tbody>
                {/* {users.map((user) => (
                  <tr key={user.Name} className="text-center text-white">
                    <td className="px-5">{user.username}</td>
                    <td className="px-5">{user.email}</td>
                    <td className="px-5">{user.usertype}</td>
                  </tr>
                ))} */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <React.Fragment>
        <Dialog
          open={open}
          // TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          
          <DialogTitle>{"ADD USER"}</DialogTitle>
          <DialogContent>
            <form className="space-y-4 md:space-y-6 w-[350px] rounded-lg " action="#">
              <div>
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Enter Your Username:{" "}
                </label>
                <input
                  type="username"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setusername(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="Email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Enter Your email:{" "}
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Enter Your Password:{" "}
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  required
                />
                {password.length > 0 && password.length < 6 && (
                  <p className="text-red-500 text-xs mt-1">
                    Password must be at least 6 characters.
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required
                    />
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <button
                  onClick={handlesubmit}
                  type="submit"
                  className={`mt-4 ${
                    isPasswordValid
                      ? "w-full text-white bg-orange-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      : "w-full text-white bg-orange-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 cursor-not-allowed"
                  }`}
                  disabled={!isPasswordValid && signingUp}
                >
                  {signingUp ? <span>Adding User</span> : <span>Add user</span>}
                </button>
                
              </div>
            </form>
          </DialogContent>
         
          <DialogActions></DialogActions>
        </Dialog>
      </React.Fragment>
    </div>
  );
};

export default Dashboard;

// tailwind config mei bhi changes hai
