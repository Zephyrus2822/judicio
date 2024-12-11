import { Link } from "react-router-dom";
// import { auth } from "./firebase";
import { jwtDecode } from "jwt-decode";

import { useState } from "react";

const Navigation = () => {
  // const [decodedtoken, setdecodedtoken] = useState("")
  
  const token=window.localStorage.getItem('JudicioAccessToken')

  
  const signout =async () => {
    try {
      // await auth.signOut();
      window.localStorage.removeItem('JudicioAccessToken')
      window.location.reload()
    } catch (error) {
      console.error("Error Logout ",error.message);
    }
  };


  return (
    <div className="header">
      <nav>
        <div className="Logo-wrapper">
          <h1 className="Logo">Judicio</h1>
        </div>
        <ul>
        <li><a href="/">Home</a></li>
            <li>
                <a href="/About">Docs</a>
              </li>
              <li>
                <a href="/prisoner">Get Verdict</a>
              </li>
              <li>
              <a href="/AdminDashboard">Admin Dashboard</a>
            </li>
              <li>
                <a href="/verdictspassed">Verdicts Passed</a>
              </li>
              <li>
                <a href="/addprisoner">Add Prisoner</a>
              </li>
              {/* <li>
                <a href="/updateprisoner">Update Prisoner</a>
              </li> */}
              <li>
                <a href="/eligiblecriminals">Eligibility</a>
              </li>
              <li>
                <a href="/aboutbail">Information</a>
              </li>
              <li>
                <a href="/dashboard">User Dashboard</a>
              </li>
              <li>
                <a href="/judgedashboard">Judge's Dashboard</a>
              </li>
              <li>
                <a href="/map">Nearby Locations</a>
              </li>

        </ul>
        
        {token ? (
          <div className="flex justify-center items-center gap-2 ">
            <h1 className="text-white mt-3 text-2xl">Hi,{jwtDecode(token).name}</h1>
            <a onClick={signout} className="chat">
              Logout
            </a>
          </div>
        ) : (
          <div>
            <a className="chat" href="/login">
              Login
            </a>
          </div>
        )}
        
      </nav>
    </div>
  );
};

export default Navigation;