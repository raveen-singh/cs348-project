import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import axios from "axios";
import { useEffect } from "react";

export default function BaseMap({ building }) {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyBEp1Ikww7LTAnj8Gzew1jY555INnUbArQ",
  });

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${building.address}&key=AIzaSyD97JXp2t36bmAvNtSUibldGBs08Z4cHxE`
      );
      console.log(data);
      setLatitude(data.results[0].geometry.location.lat ?? 0);
      setLongitude(data.results[0].geometry.location.lng ?? 0);
    })();
  }, []);

  if (!isLoaded) return <div>Loading...</div>;
  return <Map lat={latitude} lng={longitude} />;
}

function Map({ lat, lng }) {
  return (
    <Card>
      <CardContent>
        <GoogleMap
          zoom={10}
          center={{ lat, lng }}
          mapContainerClassStyle={{ width: "600px", height: "300px" }}
        >
          <MarkerF position={{ lat, lng }} />
        </GoogleMap>
      </CardContent>
    </Card>
  );
}

// export default function BaseMap() {
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: "AIzaSyBEp1Ikww7LTAnj8Gzew1jY555INnUbArQ",
//   });

//   if (!isLoaded) return <div>Loading...</div>;
//   return <Map />;
// }

// function Map() {
//   return (
//     <Card>
//       <CardContent>
//         <GoogleMap
//           zoom={10}
//           center={{ lat: 44, lng: -80 }}
//           mapContainerStyle={{ width: "600px", height: "300px" }}
//         >
//           <MarkerF position={{ lat: 44, lng: -80 }} />
//         </GoogleMap>
//       </CardContent>
//     </Card>
//   );
// }
