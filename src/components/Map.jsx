import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { Icon } from "leaflet";
import L from "leaflet";
import pin from "../assets/alarm.png";
import { useLiveLocation } from "../hooks/useLiveLocation";

const Map = () => {
  //const position=[22.68,88.46]
  const { coords, error, loading, startTracking, stopTracking } =
    useLiveLocation();

  const customIcon = L.icon({
    iconUrl: pin,
    iconSize: [30, 30],
  });

  if (loading) return <h2>Loading Map</h2>;
  if (error)
    return (
      <h2 className="text-center font-bold text-red-800  text-4xl">{error}</h2>
    );

  return (
    <MapContainer center={[coords.lat, coords.lng]} zoom={18}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={[coords.lat, coords.lng]} icon={customIcon}>
        <Popup>Your Location</Popup>
      </Marker>
    </MapContainer>
  );
};
export default Map;
