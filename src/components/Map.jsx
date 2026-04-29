import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import L from "leaflet";
import pin from "../assets/alarm.png";

const RecenterMap = ({ coords }) => {
  const map = useMap();
  useEffect(() => {
    if (coords) {
      map.flyTo([coords.lat, coords.lng], map.getZoom(), {
        animate: true,
        duration: 1,
      });
    }
  }, [coords, map]);
  return null;
};

const Map = ({ coords, error, loading }) => {
  const customIcon = L.icon({
    iconUrl: pin,
    iconSize: [30, 30],
  });

  if (loading) return (
    <div className="flex items-center justify-center h-full">
      <h2 className="text-xl font-bold">Loading Map...</h2>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center h-full">
      <h2 className="text-center font-bold text-red-800 text-4xl">{error}</h2>
    </div>
  );

  if (!coords) return (
    <div className="flex items-center justify-center h-full">
      <h2 className="text-xl font-bold">Waiting for GPS...</h2>
    </div>
  );

  return (
    <MapContainer
      center={[coords.lat, coords.lng]}
      zoom={16}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <RecenterMap coords={coords} />

      <Circle center={[coords.lat, coords.lng]} radius={500} pathOptions={{color:'red'}}/>
      <Marker position={[coords.lat, coords.lng]} icon={customIcon}>
        <Popup>Your Location</Popup>
      </Marker>

    </MapContainer>
  );
};

export default Map;