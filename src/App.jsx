import React from "react";
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
import About from "./components/About";
import Dashboard from "./components/Dashboard";
import Modal from "./components/Modal";
import AddCrime from "./components/AddCrime";

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
      return <Modal message="Something went wrong." onClose={this.handleClose} />;
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
          <Route path="/updateprisoner" element={<UpdatePrisoner />} />
          <Route path="/eligiblecriminals" element={<Eligibility />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/addcrime" element={<AddCrime />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
