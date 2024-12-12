import axios from "axios";
import React, { useEffect, useState } from "react";
import video3 from '../assets/video2.mp4';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Password } from "@mui/icons-material";
// import Slide from '@mui/material/Slide';
// import { TransitionProps } from '@mui/material/transitions';

const AdminDashboard = () => {
  // State to manage the open/close state of the dialog
  const [open, setOpen] = useState(false);

  // States for user details in the form
  const [UserName, setUserName] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("")
  const [Name, setName] = useState("")
  const [Liscensenumber, setLiscensenumber] = useState("")
  const [AssignedCourt, setAssignedCourt] = useState("")
  const [userRole, setuserRole] = useState("")
  const [Password, setPassword] = useState("");
  const isPasswordValid = Password.length >= 6;
  const [signingUp, setsigningUp] = useState(false);

  // Function to open the dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Function to close the dialog
  const handleClose = () => {
    setOpen(false);
  };

  // State to manage the list of users fetched from the API
  const [users, setusers] = useState([]);
  
  // Function to fetch users from the API
  const fetchUsers = async () => {
    await axios
      .get(`${import.meta.env.VITE_DEV_URL}auth/users`)
      //https://judicio-server.onrender.com/
      .then((res) => {
        console.log(res);
        setusers(res.data);
      })
      .catch((err) => {
        console.error("Server Error", err);
      });
  };
  const isValidMap = Array.isArray(users);
  // useEffect to fetch users when the component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  // Function to handle form submission for adding a new user
  const handlesubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${import.meta.env.VITE_DEV_URL}auth/register/officials`, {
        UserName,
        Name,
        Email,
        Phone,
        Liscensenumber,
        AssignedCourt,
        Password,
        userRole
      })
      .then((response) => {
        console.log(response);
        alert(`${userRole} created Successfully`)

       
        // window.location.reload();
      })
      .catch((err) => console.error("Server Error", err));
  };

  return (
    <div className='bg-gradient-to-br from-amber-200 to-orange-600 min-h-screen py-10 '>
      <div className="relative w-full z-10 ">
        <div className="cards my-20 ml-[215px] flex justify-start items-center gap-none">
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
            <h2>Users: {users.length}</h2>
          </div>
          <button
            onClick={handleClickOpen}
            className="cards ml-[370px] flex justify-start items-center"
          >
            <div className="dashboard-btn-1">
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
              <h2>Add Users</h2>
            </div>
          </button>
        </div>

        <div className="dashboard-conatiner border-2 bg-opacity-75 rounded-lg backdrop-blur-lg min-h-[40vh] w-[70vw] ml-[300px] p-10 flex justify-center items-center shadow-[0_4px_30px_rgba(255,69,0,0.9)]">
          <div className="w-full">
            <table className="w-full">
              <thead>
                <tr className="border-b-2">
                  <th className="px-5 text-2xl text-center w-1/4 text-orange-500">Name</th>
                  <th className="px-5 text-2xl text-center w-1/4 text-orange-500">Email</th>
                  <th className="px-5 text-2xl text-center w-1/4 text-orange-500">Court</th>
                  <th className="px-5 text-2xl text-center w-1/4 text-orange-500">User Type</th>
                </tr>
              </thead>
              <tbody>
                {isValidMap && users.length>0 ? users.map((user) => (
                  <tr key={user.Name} className="text-center text-white">
                    <td className="px-5">{user.UserName}</td>
                    <td className="px-5">{user.Email}</td>
                    <td className="px-5">{user.profileInfo.AssignedCourt}</td>
                    <td className="px-5">{user.userRole}</td>
                  </tr>
                )):null}
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
                  htmlFor="UserName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Enter Your UserName:{" "}
                </label>
                <input
                  type="UserName"
                  name="UserName"
                  id="UserName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="UserName"
                  value={UserName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="Name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Enter Your Name:{" "}
                </label>
                <input
                  type="Name"
                  name="Name"
                  id="Name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Name"
                  value={Name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="Phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Enter  Phone number:{" "}
                </label>
                <input
                  type="Phone"
                  name="Phone"
                  id="Phone"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="+9177884411225"
                  value={Phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="Liscensenumber"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Enter License Number:{" "}
                </label>
                <input
                  type="text"
                  name="Liscensenumber"
                  id="Liscensenumber"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Lisense Number"
                  value={Liscensenumber}
                  onChange={(e) => setLiscensenumber(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="AssignedCourt"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Allot Court:{" "}
                </label>
                <input
                  type="text"
                  name="AssignedCourt"
                  id="AssignedCourt"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="AssignedCourt"
                  value={AssignedCourt}
                  onChange={(e) => setAssignedCourt(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="Email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Enter Your Email:{" "}
                </label>
                <input
                  type="Email"
                  name="Email"
                  id="Email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Email"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="Password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Enter Your Password:{" "}
                </label>
                <input
                  type="Password"
                  name="Password"
                  id="Password"
                  placeholder="Password"
                  className={`bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 ${
                    isPasswordValid
                      ? "dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      : "border-red-500"
                  }`}
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />

                {!isPasswordValid && (
                  <p className="text-red-500 text-sm mt-1">
                    Password must be at least 6 characters long.
                  </p>
                )}
                <div className="space-y-2">
                  <label
                    htmlFor="userRole-select"
                    className="block mb-2 text-xl font-medium text-gray-300 dark:text-white"
                  >
                    User Role:
                  </label>
                  <select
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setuserRole(e.target.value)}
                    name="userRole"
                    id="userRole-select"
                  >
                    <option value="">--Please Select User Role--</option>
                    <option value="The Chief Justice">The Chief Justice</option>
                    <option value="Judge">Judge</option>
                    <option value="Lawyer">Lawyer</option>
                    <option value="Middleman">Middleman</option>
                    
                  </select>
                </div>
              </div>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button disabled={!isPasswordValid} onClick={handlesubmit}>Add</Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </div>
  );
};

export default AdminDashboard;
