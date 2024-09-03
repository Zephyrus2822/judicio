import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { FaEye } from "react-icons/fa6";

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
    <section className="bg-gray-50 dark:bg-gray-900">

      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign Up
            </h1>

            <form className="space-y-4 md:space-y-6"  action="#">

              <div>
              <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Your Username: {" "}</label>
                <input
                  type="username"
                  name="username"
                  id="username"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company"
                  value={username}
                  onChange={(e)=>setusername(e.target.value)}
                  required
                />
              </div>

              <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Your Password: {" "}</label>
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
                      <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                    </div>

                  </div>
                </div>
              </div>

              <div>
                <button type="submit" className="mt-4 w-full text-white bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                  Sign Up
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account? 
                  <button onClick={() => navigate('/login')} className="font-medium text-blue-600 hover:underline dark:text-primary-500 ml-1">
                    Sign In
                  </button>
                </p>
              </div>


            </form>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Register;
