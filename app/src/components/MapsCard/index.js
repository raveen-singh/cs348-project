import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import axios from "axios";
import { useEffect } from "react";

export default function BaseMap(building) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBEp1Ikww7LTAnj8Gzew1jY555INnUbArQ",
  });

  if (!isLoaded) return <div>Loading...</div>;
  return Map(building);
}

function Map(building) {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const getLocation = async (address) => {
    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${key}`
    );
    // setLatitude(data.results[0].geometry.location.lat ?? 0);
    // setLongitude(data.results[0].geometry.location.lng ?? 0);
  };

  useEffect(() => getLocation(building.address), []);

  const center = useMemo(() => ({ lat: latitude, lng: longitude }), []);
  return (
    <Card>
      <CardContent>
        <GoogleMap
          zoom={10}
          center={{ lat: latitude, lng: longitude }}
          mapContainerClassName={{ width: "100%", height: "100%" }}
        >
          <Marker position={center} />
        </GoogleMap>
      </CardContent>
    </Card>
  );
  //}
}
