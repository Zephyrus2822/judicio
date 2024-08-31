import React from "react";
import { Link } from "react-router-dom";
import dotenv from 'dotenv'

const Login = () => {
  const handlesubmit = (e) => {
    e.preventDefault();
    axios.post(`${process.env.DEV_VITE_URL}api/login`)
  };
  return (
    <main className="bg-blue-400 relative ">
      <div className="absolute top-1/2 left-1/2 -translate-x-[50%] translate-y-[30%]  bg-green-400 py-10 px-5 rounded-lg space-y-10">
        <h1>Login</h1>
        <form onSubmit={handlesubmit} action="">
          <div className="input">
            <label className="text-2xl" htmlFor="">
              Username :{" "}
            </label>
            <input
              className="text-2xl px-2  outline-none py-2 border-b-2 border-black bg-transparent"
              placeholder="Username"
              type="text"
            />
          </div>
          <div className="input">
            <label className="text-2xl" htmlFor="">
              Password :{" "}
            </label>
            <input
              className="text-2xl px-2  outline-none py-2 border-b-2 border-black bg-transparent"
              placeholder="password"
              type="Password"
            />
          </div>
          <button
            className="flex justify-center items-center bg-blue-500 text-2xl p-2 rounded-lg w-full mt-10"
            type="submit"
          >
            Login
          </button>
        </form>
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
