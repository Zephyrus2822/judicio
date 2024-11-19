import React from 'react';
import './Modal.css'; // Create this file for styling the modal

function Modal({ message, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Error</h2>
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Modal;
