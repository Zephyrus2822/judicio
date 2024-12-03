import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Prisoner from "./components/Prisoner";
import Tablee from "./components/judgedashboard";
import AddPrisoner from "./components/AddPrisoner";
import Dashboard from "./components/dash";
import UpdatePrisoner from "./components/UpdatePrisoner";
import AboutBail from "./components/AboutBail";
import Eligibility from "./components/Eligibility";
import About from "./components/About";
import AdminDashboard from "./components/AdminDashboard";
import Modal from "./components/Modal";
import AddCrime from "./components/AddCrime";
import UserDashboard from "./components/UserDashboard";
import Judgedashboard from "./components/judgedashboard";

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

  handleClose = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Modal message="Something went wrong." onClose={this.handleClose} />
      );
    }

    return this.props.children;
  }
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/prisoner" element={<Prisoner />} />
          <Route path="/aboutbail" element={<AboutBail />} />
          <Route path="/verdictspassed" element={<Tablee />} />
          <Route path="/addprisoner" element={<AddPrisoner />} />
          {/* <Route path="/updateprisoner" element={<UpdatePrisoner />} /> */}
          <Route path="/eligiblecriminals" element={<Eligibility />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/addcrime" element={<AddCrime />} />
          <Route path="/user" element={<UserDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/judgedashboard" element={<Judgedashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
