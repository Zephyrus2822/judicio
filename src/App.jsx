import { useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
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

function App() {
  const username = window.localStorage.getItem("UserNamejudicio");
  const LoggedIn = window.localStorage.getItem("isLoggedInjudicio");

  const usertype = window.localStorage.getItem("isAdmin");


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        {/* Unauthorized Route */}
        {!LoggedIn && (
          <>
          <Route path="/About" element={<About/>}/>

            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
          </>
        )}

        {/* Protected Routes */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/login" element={<Navigate to="/" />}></Route>
          <Route path="/register" element={<Navigate to="/" />}></Route>

          {usertype != "Admin" ? (
            <>
              <Route path="/prisoner" element={<Prisoner />}></Route>
              <Route path="/aboutbail" element={<AboutBail />}></Route>
            </>
          ) : (
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
  );
}

export default App;
