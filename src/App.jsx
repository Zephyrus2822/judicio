import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Prisoner from "./components/Prisoner";
import Tablee from "./components/Tablee";
import AboutBail from "./components/AboutBail";
import ProtectedRoutes from "./components/ProtectedRoutes";
import PublicRoutes from "./components/PublicRoutes";

function App() {
  const LoggedIn = window.localStorage.getItem("isLoggedInjudicio");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route element={<PublicRoutes />}>
          {/* <Route path="/" element={<Home />}></Route> */}
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Route>

        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/prisoner"
            element={LoggedIn ? <Prisoner /> : <Home />}
          ></Route>
          <Route
            path="/verdictspassed"
            element={LoggedIn ? <Tablee /> : <Home />}
          ></Route>
          <Route
            path="/baildetails"
            element={LoggedIn ? <AboutBail /> : <Home />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
