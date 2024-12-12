import React, { useState, useEffect } from "react";
import "./lawyernav.css";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, divIcon, point } from "leaflet";
import Switch from "./Switch";
import CityDropdown from './CityDropdown';
import './CityDropdown.css';

const MapUpdater = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
};

const LawyerNav = () => {
  const [selectedCity, setSelectedCity] = useState("Kolkata");
  const [selectedType, setSelectedType] = useState("lawyers");
  const [userLocation, setUserLocation] = useState(null);
  const [initialMapCenter, setInitialMapCenter] = useState(null);

  // Data objects
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

  // Helper functions
  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  const createCustomClusterIcon = (cluster) => {
    return new divIcon({
      html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
      className: "custom-markercluster-icon",
      iconSize: point(33, 33, true),
    });
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const toRad = (value) => {
    return (value * Math.PI) / 180;
  };

  const findNearestCity = (userCoords) => {
    let nearestCity = "Kolkata";
    let shortestDistance = Infinity;

    Object.entries(lawyers).forEach(([city, locations]) => {
      const cityCoords = locations[0].geocode;
      const distance = calculateDistance(
        userCoords[0],
        userCoords[1],
        cityCoords[0],
        cityCoords[1]
      );

      if (distance < shortestDistance) {
        shortestDistance = distance;
        nearestCity = city;
      }
    });

    return nearestCity;
  };

  // Effects
  useEffect(() => {
    const getUserLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation([latitude, longitude]);
            const nearestCity = findNearestCity([latitude, longitude]);
            setSelectedCity(nearestCity);
            setInitialMapCenter([latitude, longitude]);
          },
          (error) => {
            console.warn("Error getting location:", error);
            setInitialMapCenter(lawyers.Kolkata[0].geocode);
          }
        );
      } else {
        console.warn("Geolocation not supported");
        setInitialMapCenter(lawyers.Kolkata[0].geocode);
      }
    };

    getUserLocation();
  }, []);

  const locations = selectedType === "lawyers" ? lawyers : courts;

  const cities = Object.keys(lawyers);

  return (
    <div className="main-container items-center justify-between p-2">
      <div className="title w-full items-center mt-[50px]">
        <h1 className="font-bold text-orangered">LEGAL SERVICES NEAR YOU</h1>
      </div>

      <div className="dropdown-container mt-[20px] text-black px-2 py-1">
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
          className="ml-4 text-black"
        >

          <option value="lawyers">Lawyers</option>
          <option value="courts">Courts</option>
        </select>
      <div className="flex items-center justify-center gap-2 mt-[20px]">
        <CityDropdown 
          selectedCity={selectedCity}
          onCityChange={(city) => setSelectedCity(city)}
          cities={cities}
        />

        <div className="inline-flex items-center">
          <Switch
            checked={selectedType === "lawyers"}
            onChange={() => setSelectedType(selectedType === "lawyers" ? "courts" : "lawyers")}
          >
            {selectedType === "lawyers" ? "L" : "C"}
          </Switch>
        </div>
      </div>

      <div className="map-container h-60 w-85 border-rounded border-2px solid black mt-[20px]">
        {initialMapCenter && (
          <MapContainer
            center={initialMapCenter}
            zoom={6}
            key={`${selectedCity}-${selectedType}`}
          >
            <MapUpdater center={locations[selectedCity][0].geocode} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MarkerClusterGroup
              chunkedLoading
              iconCreateFunction={createCustomClusterIcon}
            >
              {userLocation && (
                <Marker
                  position={userLocation}
                  icon={new Icon({
                    iconUrl:
                      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                  })}
                >
                  <Popup>
                    <h3>Your Location</h3>
                  </Popup>
                </Marker>
              )}
              {locations[selectedCity].map((marker, idx) => (
                <Marker key={idx} position={marker.geocode}>
                  <Popup>
                    <h3>{marker.name}</h3>
                  </Popup>
                </Marker>
              ))}
            </MarkerClusterGroup>
          </MapContainer>
        )}
      </div>

      <div className="help ml-[150px] mt-[130px]">
        <p className="items-center">
          <a href="/contactus"></a>.
        </p>
      </div>
    </div>
  </div>
  );
};

export default LawyerNav;

