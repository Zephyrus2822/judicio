import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import video from "../assets/video03.mp4";
import SignInWithGoogle from "./SignInWithGoogle";

const Login = () => {
  const [UserName, setUserName] = useState("");
  const [Password, setpassword] = useState("");
  const [status, setstatus] = useState("");
  const [userRole, setuserRole] = useState("");

  const [isSigningIn, setisSigningIn] = useState(false);

  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    // setisSigningIn(true);
    e.preventDefault();

    try {
      await axios.post(`${import.meta.env.VITE_DEV_URL}auth/login`,{UserName,Password,userRole})
      .then(res=>{
        console.log(res.data)
        if(res.data.message==="Success"){
          console.log(res.data)
          window.localStorage.setItem('JudicioAccessToken',res.data.token)
          window.location.reload()
        }
      })
    } catch (error) {
      console.error(error);
    }
    
  };

  return (
    <section className="login-section-1">
      <div className="video-container">
        <video autoPlay muted loop className="video-background">
          <source src={video} type="video/mp4" />
        </video>
        <div className="flex flex-col px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full mt-15 rounded-lg shadow dark:border mt-24 sm:max-w-md xl:p-0 login-container-1">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-orange-500 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6">
                <div className="space-y-2">
                  <label
                    htmlFor="UserName"
                    className="block mb-2 text-xl font-medium text-gray-300 dark:text-white"
                  >
                    Your UserName:
                  </label>
                  <input
                    type="UserName"
                    name="UserName"
                    id="UserName"
                    value={UserName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-xl font-medium text-gray-300 dark:text-white"
                  >
                    Password:
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    value={Password}
                    onChange={(e) => setpassword(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
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
                    <option value="user">User</option>
                  </select>
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
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-white dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500 text-white"
                  >
                    Forgot password?
                  </a>
                </div>
                <button
                  type="submit"
                  disabled={isSigningIn}
                  onClick={handlesubmit}
                  className="w-full text-white bg-orange-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
              </form>
                {status && <p className="text-orangered">{status}</p>}
                <p className="text-sm font-light text-gray-300 dark:text-gray-400">
                  Do not have an account yet?{" "}
                  <Link
                    to="/register"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500 text-white"
                  >
                    Sign up
                  </Link>
                </p>
                <SignInWithGoogle />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
