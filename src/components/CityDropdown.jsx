import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import 'bootstrap/dist/css/bootstrap.min.css';

const CityDropdown = ({ selectedCity, onCityChange, cities }) => {
  return (
    <DropdownButton 
      id="city-dropdown" 
      title={selectedCity}
      variant="light"
      className="city-dropdown"
    >
      {cities.map((city) => (
        <Dropdown.Item 
          key={city} 
          onClick={() => onCityChange(city)}
          active={city === selectedCity}
        >
          {city}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

export default CityDropdown; 