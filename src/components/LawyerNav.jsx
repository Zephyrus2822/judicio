

import React, { useState, useEffect } from "react";
import "./lawyernav.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, divIcon, point } from "leaflet";

const LawyerNav = () => {
  const [selectedCity, setSelectedCity] = useState("Kolkata");
  const [selectedType, setSelectedType] = useState("lawyers");
  const [userLocation, setUserLocation] = useState(null);
  const [initialMapCenter, setInitialMapCenter] = useState(null);

  const lawyers = {
    Kolkata: [
      {
        geocode: [22.58458, 88.34914],
        name: "Advocate Chitra Bhanu Gupta, Experience: 20 Years.",
      },
      {
        geocode: [22.5726, 88.3639],
        name: "Judicial Magistrate P. Daschoudhury (Retd.), Experience: 22+ years.",
      },
      {
        geocode: [22.568225, 88.343366],
        name: "Advocate Monima Khan, Experience: 20 Years.",
      },
    ],
    Mumbai: [
      {
        geocode: [19.076, 72.8777],
        name: "Advocate Arjun Verma, Experience: 15 Years.",
      },
      {
        geocode: [19.0896, 72.8656],
        name: "Advocate Meera Deshmukh, Experience: 18 Years.",
      },
    ],
    Chennai: [
      {
        geocode: [13.0827, 80.2707],
        name: "Advocate K. S. Subramanian, Experience: 25 Years.",
      },
      {
        geocode: [13.0674, 80.2376],
        name: "Advocate R. Kamala, Experience: 12 Years.",
      },
    ],
    Belgaum: [
      {
        geocode: [15.8497, 74.4977],
        name: "Advocate Rajesh Gowda, Experience: 10 Years.",
      },
      {
        geocode: [15.8547, 74.5046],
        name: "Advocate Priya Desai, Experience: 8 Years.",
      },
    ],
    Bangalore: [
      {
        geocode: [12.9716, 77.5946],
        name: "Advocate Suresh Nair, Experience: 20 Years.",
      },
      {
        geocode: [12.9352, 77.6245],
        name: "Advocate Anjali Rao, Experience: 17 Years.",
      },
    ],
  };

  const courts = {
    Kolkata: [
      {
        geocode: [22.5726, 88.3639],
        name: "Calcutta High Court, Established: 1862",
      },
      {
        geocode: [22.5697, 88.3697],
        name: "City Civil and Sessions Court, Kolkata",
      },
    ],
    Mumbai: [
      {
        geocode: [18.9322, 72.8347],
        name: "Bombay High Court, Established: 1862",
      },
      {
        geocode: [19.0269, 72.8553],
        name: "City Civil and Sessions Court, Mumbai",
      },
    ],
    Chennai: [
      {
        geocode: [13.0827, 80.2707],
        name: "Madras High Court, Established: 1862",
      },
      {
        geocode: [13.0698, 80.2707],
        name: "City Civil Court, Chennai",
      },
    ],
    Belgaum: [
      {
        geocode: [15.8497, 74.4977],
        name: "District and Sessions Court, Belgaum",
      },
      {
        geocode: [15.8547, 74.5046],
        name: "Civil Court, Belgaum",
      },
    ],
    Bangalore: [
      {
        geocode: [12.9716, 77.5946],
        name: "Karnataka High Court, Established: 1884",
      },
      {
        geocode: [12.9783, 77.5731],
        name: "City Civil Court, Bangalore",
      },
    ],
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  const MapUpdater = ({ center }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(center);
    }, [center, map]);
    return null;
  };

  const createCustomClusterIcon = (cluster) => {  // can also make custom icoons for markers, depends on front end people 
    //remember: must always return a div item element , nothing else or website breaks
    return new divIcon({
      html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
      className: "custom-markercluster-icon",
      iconSize: point(33, 33, true), //since point function takes x-size, y-size and bool val as params
    });
  };

  return (
    <div className="main-container items-center justify-between p-2">
      <div className="title w-full items-center mt-[50px]">
        <h1 className="font-bold text-orangered">LEGAL SERVICES NEAR YOU</h1>
      </div>

      <div className="dropdown-container mt-[20px]">
        <select value={selectedCity} onChange={handleCityChange}>
          {Object.keys(selectedType === "lawyers" ? lawyers : courts).map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
        
        <select 
          value={selectedType} 
          onChange={handleTypeChange}
          className="ml-4"
        >
          <option value="lawyers">Lawyers</option>
          <option value="courts">Courts</option>
        </select>
      </div>

      <div className="map-container h-60 w-85 border-rounded border-2px solid black mt-[20px]">
        <MapContainer
          center={lawyers[selectedCity][0].geocode}
          zoom={6}
          key={selectedCity}
        >
          <MapUpdater center={lawyers[selectedCity][0].geocode} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MarkerClusterGroup
            chunkedloading
            iconCreateFunction={createCustomClusterIcon}
          >
            {lawyers[selectedCity].map((marker, idx) => (
              <Marker key={idx} position={marker.geocode}>
                <Popup>
                  <h3>{marker.name}</h3>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>
      </div>

      <div className="help ml-[150px] mt-[130px]">
        <p className="items-center">
          In case of any complaints, contact us <a href="/contactus">here</a>.
        </p>
      </div>
    </div>
  );
};

export default LawyerNav;


