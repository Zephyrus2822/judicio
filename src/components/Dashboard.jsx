import React, { useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import Popup from "./Popup"; // Import the Popup component
import "./dash.css";
import video2 from "../assets/video2.mp4";

const Dash = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [aadhar, setAadhar] = useState("");
  const [fathersName, setFathersName] = useState("");
  const [bailStatus, setBailStatus] = useState("");
  const [crime, setCrime] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const [error, setError] = useState(null);

  // Webcam state
  const [showWebcam, setShowWebcam] = useState(false);
  const [image, setImage] = useState(null);
  const webcamRef = useRef(null);

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

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    setShowWebcam(false);
  }, [webcamRef, setImage, setShowWebcam]);

  return (
    <div className="video-container">
      <video autoPlay muted loop className="video-background">
        <source src={video2} type="video/mp4" />
      </video>
      <div className="dashboard-container">
        <h2 className="title">USER DASHBOARD</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="profile-container">
  <div className="profile-image-container">
    {image ? (
      <img src={image} alt="prisoner-img" className="circular-image" />
    ) : (
      <h2>NO IMAGE</h2>
    )}
  </div>
  <button className="open-webcam-button" onClick={() => setShowWebcam(true)}>
    Open Webcam
  </button>
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
        </div>
  
        <div className="applied-applications">
          <h1>Applied Applications</h1>
          <table>
            <thead>
              <tr>
                <th>Application Id</th>
                <th>Applicant Name</th>
                <th>Crime</th>
                <th>Lawyer Applied</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>vhfbev</td>
                <td>vkjebfwv</td>
                <td>rbqi</td>
                <td>kre</td>
                <td>gw</td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
  
      {showWebcam && (
        <Popup onClose={() => setShowWebcam(false)}>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="webcam-view"
          />
          <button className="capture-button" onClick={capture}>
            Capture Screenshot
          </button>
        </Popup>
      )}
    </div>
  );
}
export default Dash;
