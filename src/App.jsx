import React, { useState, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Web3 from "web3"; // Import Web3
import Register from "./components/Register";
import Home from "./components/Home";
import Prisoner from "./components/Prisoner";
import Tablee from "./components/Tablee";
import AddPrisoner from "./components/AddPrisoner";
import UpdatePrisoner from "./components/UpdatePrisoner";
import AboutBail from "./components/AboutBail";
import Eligibility from "./components/Eligibility";
import ProtectedRoutes from "./components/ProtectedRoutes";
import About from "./components/About";
import Dashboard from "./components/Dashboard";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

function App() {
    // MetaMask-related states
  const [account, setAccount] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  
  const username = window.localStorage.getItem("UserNamejudicio");
  const LoggedIn = window.localStorage.getItem("isLoggedInjudicio");
  const usertype = window.localStorage.getItem("usertype");

    // MetaMask connection logic
    useEffect(() => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        loadMetaMaskData(web3);
      } else {
        console.warn("MetaMask not detected. Please install MetaMask!");
      }
    }, []);
  
      // Function to connect and load MetaMask account
  const loadMetaMaskData = async (web3) => {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      setIsConnected(true);
    } catch (error) {
      console.warn("User denied MetaMask connection", error);
    }
  };

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div>
        {/* MetaMask connection status */}
        {isConnected ? (
          <div>
            <p>Connected with MetaMask: {account}</p>
          </div>
        ) : (
          <div>
            <p>MetaMask not connected. Please connect your wallet.</p>
          </div>
        )}
      </div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        {/* Unauthorized Route */}
        {!LoggedIn && (
          <>
            <Route path="/About" element={<About />} />

            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </>
        )}
        {/* Changing UI Route */}
        {/* <Route path="/verdictspassed" element={<Tablee />}></Route>
        <Route path="/addprisoner" element={<AddPrisoner />}></Route>
        <Route path="/updateprisoner" element={<UpdatePrisoner />}></Route>
        <Route path="/eligiblecriminals"element={<Eligibility />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/aboutbail" element={<AboutBail />}></Route> */}

        {/* Protected Routes */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/login" element={<Navigate to="/" />}></Route>
          <Route path="/register" element={<Navigate to="/" />}></Route>
          <Route path="/prisoner" element={<Prisoner />}></Route>

          {usertype=== "Judiciary" && (
            <>
              <Route path="/aboutbail" element={<AboutBail />}></Route>
            </>
          ) 
            
          }

          {usertype==="Admin" &&(
            <>
            
              <Route path="/verdictspassed" element={<Tablee />}></Route>
              <Route path="/addprisoner" element={<AddPrisoner />}></Route>
              <Route
                path="/updateprisoner"
                element={<UpdatePrisoner />}
              ></Route>
              <Route
                path="/eligiblecriminals"
                element={<Eligibility />}
              ></Route>
              <Route path="/dashboard" element={<Dashboard/>}></Route>
          
            </>
          )}
          {usertype==="SubAdmin" &&(
            <>
            
              <Route path="/verdictspassed" element={<Tablee />}></Route>
              <Route path="/addprisoner" element={<AddPrisoner />}></Route>
              <Route
                path="/updateprisoner"
                element={<UpdatePrisoner />}
              ></Route>
              <Route
                path="/eligiblecriminals"
                element={<Eligibility />}
              ></Route>
              
          
            </>
          )}
        </Route>
        <Route path="*" element={<Navigate to="/" />}></Route>
      </Routes>
    </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
