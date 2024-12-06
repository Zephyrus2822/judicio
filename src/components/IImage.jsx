import React, { useRef, useState, useCallback } from "react";
import ReactDOM from "react-dom";
import Webcam from "react-webcam";

const IImage = () => {
  const [image, setImage] = useState(null);
  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  }, [webcamRef, setImage]);

  return (
    <div className="parent">
      <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
      <button onClick={capture}>Capture Screenshot</button>
      {image && <img src={image} alt="Captured" />}
    </div>
  );
};

export default IImage;
