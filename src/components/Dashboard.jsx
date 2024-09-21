import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {

  const usertype=window.localStorage.getItem("usertype");
  
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const isPasswordValid = password.length >= 6;

  const [signingUp, setsigningUp] = useState(false)

  const [showform, setshowform] = useState(false)

  const handlesubmit=(e)=>{
    e.preventDefault()
    if (usertype === "Admin") {
      axios
        .post(`${import.meta.env.VITE_DEV_URL}api/signupAdmin`, {
          username,
          email,
          password,

        })
        .then((response) => {
          console.log(response);
          window.location.reload()
        })
        .catch((err) => {
          console.error("Server Error", err);
        });
  }}

    const [users, setusers] = useState([])
    const fetchUsers=async()=>{
        await axios.get(`${import.meta.env.VITE_DEV_URL}api/users`)
        .then(res=>{
            console.log(res)
            setusers(res.data)
        })
        .catch(err=>{
            console.error("Server Error",err)
        })
    }
    useEffect(()=>{
        fetchUsers()
    },[])
  
  return (
    <main className="min-h-screen w-full bg-gradient-to-r from-blue-400 to-blue-700">
      <div className="w-full ">
       
        <div className="cards  ml-[370px] flex justify-start items-center">
          
          <div className="w-60 h-32 gap-4 ml-[260px] rounded-lg bg-gradient-to-tr from-zinc-100 to-slate-500 font-bold text-black  text-2xl m-10 flex justify-center items-center">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                />
              </svg>
            </span>
            <h2>Users :{users.length}</h2>
          </div>
          
          <button onClick={()=>setshowform(!showform)} className="w-60 h-32 gap-4 rounded-lg bg-gradient-to-tr from-zinc-100 to-slate-500 font-bold text-black  text-2xl m-10 flex justify-center items-center">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                />
              </svg>
            </span>
            <h2>ADD Users</h2>
          </button>
          
        </div>
        <div className="bg-white rounded-lg min-h-[40vh] w-[60vw]  ml-[370px]  p-10">
          <div className="px-60 ">
            <table>
              <tr className="my-5 border-b-2 ">
                <th className="px-5 text-2xl ">Name</th>
                <th className="px-5 text-2xl ">Email</th>
                <th className="px-5 text-2xl ">usertype</th>
                
              </tr>

              {users.map((user) => (
                <tr key={user.Name}>
                  <td className="px-5 text-center">{user.username}</td>
                  <td className="px-5 text-center">{user.email}</td>
                  <td className="px-5 text-center">{user.usertype}</td>
                
                </tr>
              ))}
            </table>
          </div>
        </div>
        {showform && (
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 w-[30%] bg-orange-300 rounded-lg shadow-md ml-[550px]">
          <form className="space-y-4 md:space-y-6" action="#">
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
                  ? "w-full text-white bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  : "w-full text-white bg-green-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 cursor-not-allowed"
              }`}
              disabled={!isPasswordValid && signingUp}
            >
              {signingUp ? <span>Signing Up</span> : <span>Sign up</span>}
            </button>
            
          </div>
        </form>
        </div>
        )}
        
      </div>
    </main>
  );
};

export default Dashboard;
