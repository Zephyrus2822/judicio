// src/components/Popup.jsx
import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import "./popup.css";

const Popup = ({ children, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}><IoCloseSharp /></button>
        {children}
      </div>
    </div>
  );
};

export default Popup;
