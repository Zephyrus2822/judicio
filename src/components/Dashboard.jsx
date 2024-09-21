import axios from "axios";
import React, { useEffect, useState } from "react";


const Dashboard = () => {

    const [users, setusers] = useState([])
    const fetchUsers=async()=>{
        await axios.get(`https://judicio-server.onrender.com/api/users`) //https://judicio-server.onrender.com/
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
          
          <div className="w-60 h-32 gap-4 rounded-lg bg-gradient-to-tr from-zinc-100 to-slate-500 font-bold text-black  text-2xl m-10 flex justify-center items-center">
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
      </div>
    </main>
  );
};

export default Dashboard;
