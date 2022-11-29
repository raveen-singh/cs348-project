import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";
import { useEffect } from "react";

export default function BaseMap({ building }) {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBEp1Ikww7LTAnj8Gzew1jY555INnUbArQ",
  });

  const getLocation = async (address) => {
    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`
    );
    console.log(data);
    // setLatitude(data.results[0].geometry.location.lat ?? 0);
    // setLongitude(data.results[0].geometry.location.lng ?? 0);
  };

  useEffect(() => getLocation(building.address), []);

  if (!isLoaded) return <div>Loading...</div>;
  return <Map building={building} lat={latitude} lng={longitude} />;
}

function Map({ lat, lng }) {
  return (
    <Card>
      <CardContent>
        <GoogleMap
          zoom={10}
          center={{ lat, lng }}
          mapContainerClassName={{ width: "100%", height: "100%" }}
        >
          <Marker position={center} />
        </GoogleMap>
      </CardContent>
    </Card>
  );
  //}
}
