import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import video from "../assets/video03.mp4";

const Register = () => {
  const [UserName, setusername] = useState("");
  const [Name, setName] = useState("");
  const [Phone, setPhone] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [status, setstatus] = useState("");
  const [showpass, setshowpass] = useState(false);
  // const [usertype, setusertype] = useState("");

  const [signingUp, setsigningUp] = useState(false);

  const navigate = useNavigate();
  const isPasswordValid = Password.length >= 6;

  const handlesubmit = async (e) => {
    // setsigningUp(true);
    e.preventDefault();

    await axios
      .post(`${import.meta.env.VITE_DEV_URL}auth/register`, {
        //https://judicio-server.onrender.com
        UserName,
        Name,
        Email,
        Phone,
        Password,
      })
      .then((response) => {
        try {
          console.log(response);
          setstatus(response.data);
          if (response.data.message == "UserCreated") {
            console.log(response.data);
            window.localStorage.setItem(
              "JudicioAccessToken",
              response.data.token
            );
            setsigningUp(false);
          }
        } catch (error) {
          alert("Server Error", error);
        }
      });
  };
  return (
    <section className="login-section-1">
      <div className="video-container">
        <video autoPlay muted loop className="video-background">
          <source src={video} type="video/mp4" />
        </video>
        <div className="flex flex-col  px-6 py-8 mx-auto md:h-screen lg:py-0 mt-8">
          <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-lg xl:p-0 login-container-1">
            <div className="p-3 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-orange-500 md:text-2xl dark:text-white">
                Sign Up
              </h1>

              <form
                className="space-y-4 md:space-y-6"
                action=""
                onSubmit={handlesubmit}
              >
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-xl font-medium text-gray-800 dark:text-white"
                  >
                    Enter Your Username:{" "}
                  </label>
                  <input
                    type="username"
                    name="UserName"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-800 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Username"
                    value={UserName}
                    onChange={(e) => setusername(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="Name"
                    className="block mb-2 text-xl font-medium text-gray-800 dark:text-white"
                  >
                    Enter Your Name:{" "}
                  </label>
                  <input
                    type="text"
                    name="Name"
                    id="Name"
                    className="bg-gray-50 border border-gray-300 text-gray-800 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Name"
                    value={Name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="Email"
                    className="block  text-xl font-medium mb-2 text-gray-300 dark:text-white"
                  >
                    Enter Your Email:{" "}
                  </label>
                  <input
                    type="Email"
                    name="Email"
                    id="Email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                    placeholder="name@company"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="Email"
                    className="block  text-xl font-medium mb-2 text-gray-300 dark:text-white"
                  >
                    Enter Phone Number:{" "}
                  </label>
                  <input
                    type="text"
                    name="Phone"
                    id="Phone"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                    placeholder="+91915364646"
                    value={Phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="Password"
                    className="block mb-2 text-xl font-medium text-gray-300 dark:text-white"
                  >
                    Enter Your Password:{" "}
                  </label>
                  <input
                    type="Password"
                    name="Password"
                    id="Password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {Password.length > 0 && Password.length < 6 && (
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
                          className="text-gray-200 dark:text-gray-300"
                        >
                          Remember me
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className={`mt-4 ${
                      isPasswordValid
                        ? "  w-full text-white bg-orange-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        : "w-full text-white bg-orange-500 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 cursor-not-allowed"
                    }`}
                    disabled={!isPasswordValid && signingUp}
                  >
                    {signingUp ? <span>Signing Up</span> : <span>Sign up</span>}
                  </button>
                </div>
              </form>
              <p className="text-sm font-light text-gray-200 dark:text-gray-400">
                Already have an account?
                <button
                  onClick={() => navigate("/login")}
                  className="mt-4 font-medium text-orange-500 hover:underline dark:text-primary-500 ml-1"
                >
                  Sign In
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
