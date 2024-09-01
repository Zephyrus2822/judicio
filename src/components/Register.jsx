import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa6";

const Register = () => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [status, setstatus] = useState("")
  const [showpass, setshowpass] = useState(false)
  const navigate=useNavigate()

  const handlesubmit = (e) => {
    e.preventDefault();
    axios.post(`${import.meta.env.VITE_DEV_URL}api/signup`,{username,email,password}).then((response) => {
      try {
        console.log(response);
        setstatus(response.data)
        if(response.data=="User Created Successfully"){

            navigate("/login")
        }
      } catch (error) {
        alert("Server Error")
      }
    });
  };
  return (
    <main className="bg-blue-400 relative ">
      <div className="absolute top-1/2 left-1/2 -translate-x-[50%] translate-y-[30%]  bg-green-400 py-10 px-5 rounded-lg space-y-10">
        <h1 className="text-3xl text-center font-bold">Register</h1>
        
        {/* <button onClick={setshowpass(!showpass)} className=" absolute top-48 right-72 translate-x-60 text-xl"><FaEye /> </button> */}
        <form onSubmit={handlesubmit} action="">
          <div className="input grid grid-cols-2">
            <label className="text-2xl" htmlFor="">
              Username :{" "}
            </label>
            <input
              className="text-2xl px-2  outline-none py-2 border-b-2 border-black bg-transparent"
              placeholder="Username"
              type="text"
              name="username"
              value={username}
              onChange={(e)=>setusername(e.target.value)}
              required
            />
          </div>
          <div className="input grid grid-cols-2">
            <label className="text-2xl" htmlFor="">
              Email:{" "}
            </label>
            <input
              className="text-2xl px-2  outline-none py-2 border-b-2 border-black bg-transparent"
              placeholder="name@gmail.com"
              type="email"
              name="email"
              value={email}
              onChange={(e)=>setemail(e.target.value)}
              required
            />
          </div>
          <div className="input grid grid-cols-2">
            <label className="text-2xl" htmlFor="">
              Password :{" "}
            </label>
            <input
              className="text-2xl px-2  outline-none py-2 border-b-2 border-black bg-transparent"
              placeholder="password"
              type="Password"
              name="password"
              value={password}
              onChange={(e)=>setpassword(e.target.value)}
              required
            />
          </div>
          <button
            className="flex w-full justify-center items-center mt-5 bg-blue-500 text-2xl p-2 rounded-lg"
            type="submit"
          >
            Register
          </button>
        </form>
        <h3 className="text-red-500 text-center text-xl">{status}</h3>
        <hr />
        <p>Already have an account please login</p>
        <a
          className="flex justify-center items-center bg-blue-500 text-2xl p-2 rounded-lg"
          href="/login"
        >
          {" "}
          Login
        </a>
      </div>
    </main>
  );
};

export default Register;
