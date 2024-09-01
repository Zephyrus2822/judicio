import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import dotenv from 'dotenv'
import axios from "axios";


const Login = () => {
  const [username, setusername] = useState("")
  const [password, setpassword] = useState("")
  const [status, setstatus] = useState("")

  const navigate=useNavigate()

  const handlesubmit = (e) => {
    e.preventDefault();
    axios.post(`${import.meta.env.VITE_DEV_URL}api/login`,{username,password})
    .then((response)=>{
      console.log(response)
      if(response.data=="Success"){
        navigate("/")
      }else{
        setstatus(response.data)
      }
    })
  };
  return (
    <main className="bg-blue-400 relative ">
      <div className="absolute top-1/2 left-1/2 -translate-x-[50%] translate-y-[30%]  bg-green-400 py-10 px-5 rounded-lg space-y-10">
        <h1 className="text-3xl text-center font-bold">Login</h1>
        
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
            className="flex justify-center items-center bg-blue-500 text-2xl p-2 rounded-lg w-full mt-10"
            type="submit"
          >
            Login
          </button>
        </form>
        <p className="text-red-600 text-xl text-center">{status}</p>
        <hr />
        <p>Don't have an account </p>
        <Link
          className="flex justify-center items-center bg-blue-500 text-2xl p-2 rounded-lg"
          to="/Register"
        >
          {" "}
          Register
        </Link>
      </div>
    </main>
  );
};

export default Login;
