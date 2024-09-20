import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import dotenv from "dotenv";
import axios from "axios";
import video from '../assets/video03.mp4';
const Login = () => {
  const [username, setUsername] = useState("");
  const [passwordd, setpassword] = useState("");
  const [status, setstatus] = useState("");
  const [usertype, setusertype] = useState("");


  const [isSigningIn, setisSigningIn] = useState(false);

  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    setisSigningIn(true);
    e.preventDefault();
    await axios
      .post(`${import.meta.env.VITE_DEV_URL}api/login`, { username, passwordd }) // relace  ${import.meta.env.VITE_DEV_URL} with // https://judicio-server.onrender.com//
      .then((response) => {
        console.log(response.data);

        if (response.data["message"] == "Success") {
          window.localStorage.setItem("UserNamejudicio", username);
          window.localStorage.setItem("isLoggedInjudicio", true);
          if (response.data.user["usertype"] === "Admin") {
            window.localStorage.setItem("usertype", "Admin");
          } else {
            window.localStorage.setItem("usertype", "Judiciary");
          }
          setisSigningIn(false);
          navigate("/");
          window.location.reload();
        } else {
          setstatus(response.data);
          setisSigningIn(false)
        }
      });
  };

  return (
    <section className="login-section-1">
      <div className="video-container">
        <video autoPlay muted loop className="video-background">
          <source src={video} type="video/mp4" />
        </video>
        <div className="flex flex-col  px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full  rounded-lg shadow dark:border mt-24  sm:max-w-md xl:p-0 login-container-1">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-orange-500 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-xl font-medium text-gray-300 dark:text-white "
                  >
                    Your Username:{" "}
                  </label>
                  <input
                    type="username"
                    name="username"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@hex"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-xl font-medium text-gray-300 dark:text-white "
                  >
                    Password:{" "}
                  </label>
                  <input
                    type="password"
                    name="passwordd"
                    id="password"
                    placeholder="••••••••"
                    value={passwordd}
                    onChange={(e) => setpassword(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
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
                  {isSigningIn ? <span>Logging in</span> : <span>Login</span>}
                </button>
                <p className="text-sm font-light text-white dark:text-gray-400">
                  <h1 className="text-gray-400 text-center text-xl">{status}</h1>
                  Don’t have an account yet?{" "}
                  <button
                    onClick={() => navigate("/register")}
                    className="font-medium text-orange-600 hover:underline dark:text-primary-500"
                  >
                    {" "}
                    Sign up
                  </button>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
