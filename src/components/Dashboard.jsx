import axios from "axios";
import React, { useEffect, useState } from "react";
import video from '../assets/video04.mp4';


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
    <main className="relative min-h-screen w-full bg-gradient-to-r from-blue-400 to-blue-700 font-serif">
            <video autoPlay muted loop className="absolute top-0 left-0 w-full h-full object-cover z-0">
                <source src={video} type="video/mp4" />
            </video>
            <div className="relative w-full z-10">
                <div className="cards ml-[370px] flex justify-start items-center">
                    <div className="w-60 h-20 gap-4 border-2 border-black rounded-lg bg-orange-600 text-white text-2xl m-20 flex justify-center items-center transition-transform duration-300 transform hover:scale-105 shadow-[4px_4px_10px_rgba(0,0,0,0.5)]">
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                            </svg>
                        </span>
                        <h2 className="text-bold text-4xl">Users: {users.length}</h2>
                    </div>
                </div>
                <div className="bg-white border-2 bg-opacity-30 border-black rounded-lg backdrop-blur-lg min-h-[40vh] w-[60vw] ml-[370px] p-10 flex justify-center items-center shadow-[0_4px_30px_rgba(255,69,0,0.9)]">
                    <div className="w-full">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b-2">
                                    <th className="px-5 text-2xl text-center w-1/3">Name</th>
                                    <th className="px-5 text-2xl text-center w-1/3">Email</th>
                                    <th className="px-5 text-2xl text-center w-1/3">User Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.Name} className="text-center">
                                        <td className="px-5">{user.username}</td>
                                        <td className="px-5">{user.email}</td>
                                        <td className="px-5">{user.usertype}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
  );
};

export default Dashboard;
