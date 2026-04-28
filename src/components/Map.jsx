import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import L from "leaflet";
import pin from "../assets/alarm.png";
import { useLiveLocation } from "../hooks/useLiveLocation";

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

const Map = () => {
  const { coords, error, loading } = useLiveLocation();

  const customIcon = L.icon({
    iconUrl: pin,
    iconSize: [30, 30],
  });

  if (loading) return <h2>Loading Map</h2>;

  if (error)
    return (
      <h2 className="text-center font-bold text-red-800 text-4xl">{error}</h2>
    );

  return (
    <MapContainer
      center={[coords.lat, coords.lng]}
      zoom={18}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <RecenterMap coords={coords} />
      <Marker position={[coords.lat, coords.lng]} icon={customIcon}>
        <Popup>Your Location</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
