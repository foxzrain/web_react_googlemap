import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import React from 'react';
import "./App.css";

const App = () => {

  // useLoadScript: It loads the Google Maps API script.
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  });

  // center: Sets a default center of the map
  const center = useMemo(() => ({ lat: 18.52043, lng: 73.856743 }), []);

  return (
    <div className="App">
      {!isLoaded 
      ? (
        <h1>Loading...</h1>
      ) 
      : (
        // GoogleMap: It is the main component inside which all the other map components render.
        <GoogleMap
          // mapContainerClassName: CSS class name that specifies the height and width of the GoogleMap component
          mapContainerClassName="map-container"
          center={center} 
          zoom={10} // zoom: Sets the initial zoom level of the map
        />
      )}
    </div>
  );
};

export default App;
