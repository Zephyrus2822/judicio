import React, { useState } from "react";
import "./Dash.css";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [fathersName, setFathersName] = useState("");
  const [bailStatus, setBailStatus] = useState("");
  const [crime, setCrime] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  // Error handling state
  const [error, setError] = useState(null);

  // Simulated data fetching with error handling
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate a successful fetch
      } catch (err) {
        setError("Failed to load data");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      {error && <p className="error-message">{error}</p>}
      <div className="profile-crime-container">
        <div className="profile-container">
          <div className="profile-image-container">
            <p className="profile-image">img</p>
          </div>
          <div className="profile-details-container">
            <input
              className="input-field"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="input-field"
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <input
              className="input-field"
              type="text"
              placeholder="Aadhar Number"
              value={aadhar}
              onChange={(e) => setAadhar(e.target.value)}
            />
            <input
              className="input-field"
              type="text"
              placeholder="Father's Name"
              value={fathersName}
              onChange={(e) => setFathersName(e.target.value)}
            />
            <input
              className="input-field"
              type="text"
              placeholder="Bail Status"
              value={bailStatus}
              onChange={(e) => setBailStatus(e.target.value)}
            />
          </div>
        </div>
        <div className="divider" />
        <div className="crime-container">
          <input
            className="input-field"
            type="text"
            placeholder="Crime"
            value={crime}
            onChange={(e) => setCrime(e.target.value)}
          />
          <input
            className="input-field"
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <input
            className="input-field"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
