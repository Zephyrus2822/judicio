import React from 'react';
import './Switch.css';

const Switch = ({ checked, onChange }) => {
  return (
    <div className="switch-container">
      <span className={`switch-text ${checked ? 'active' : ''}`}>Lawyers</span>
      <label className="slider-switch">
        <input type="checkbox" checked={checked} onChange={onChange} />
        <span className="slider round"></span>
      </label>
      <span className={`switch-text ${!checked ? 'active' : ''}`}>Courts</span>
    </div>
  );
};

export default Switch; 