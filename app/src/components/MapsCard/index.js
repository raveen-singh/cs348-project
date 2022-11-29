import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api"


export default function BaseMap(building) {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyBEp1Ikww7LTAnj8Gzew1jY555INnUbArQ"
    });

    if (!isLoaded) return <div>Loading...</div>
    return Map(building);
}

function Map(building) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode( {'address': building.address})
    var latitude = building.address.geometry.location.lat();
    var longitude = building.address.geometry.location.lng();
    const center = useMemo(() => ({ lat: latitude, lng: longitude}), []);
    //const MapsCard = ({building}) => {
        return (
            <Card>
                <CardContent>
                    <GoogleMap 
                        zoom={10} 
                        center={{ lat: latitude, lng: longitude }} 
                        mapContainerClassName={{width: '100%', height: '100%'}}
                    >
                        <Marker position={center} />
                    </GoogleMap>
                </CardContent>
            </Card>
        )
    //}
}
