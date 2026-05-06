import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  Circle,
} from "react-leaflet";
import MarkerClusterGroup from 'react-leaflet-cluster'
import "leaflet/dist/leaflet.css";
import React, { useEffect } from "react";
import L from "leaflet";
import CustomPopup from "./CustomPopup";
import pin from "../assets/gps.png";
import alertPin from '../assets/alarm.png'

const clusterIcon = (cluster) => {
  const count = cluster.getChildCount();

  let color = "#22c55e"; // low
  if (count >= 3) color = "#f59e0b";
  if (count > 5) color = "#ef4444";

  return L.divIcon({
    html: `
      <div
        style="
          background:${color};
          width:50px;
          height:50px;
          border-radius:50%;
          display:flex;
          justify-content:center;
          align-items:center;
          color:white;
          font-weight:bold;
        "
      >
        ${count}
      </div>
    `,
    className: "",
    iconSize: [40, 40],
  });
};

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

const Map = ({ coords, error, loading, reports = [], uid }) => {
  const customIcon = L.icon({
    iconUrl: pin,
    iconSize: [32, 32],
  });
  const customAlertIcon = L.icon({
    iconUrl:alertPin,
    iconSize: [36,36]
  })
  if (loading)
    return (
      <div className="flex items-center justify-center h-full">
        <h2 className="text-xl font-bold">Loading Map...</h2>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-full">
        <h2 className="text-center font-bold text-red-800 text-4xl">{error}</h2>
      </div>
    );

  if (!coords)
    return (
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

      <Circle
        center={[coords.lat, coords.lng]}
        radius={500}
        pathOptions={{ color: "red" }}
      />
      <MarkerClusterGroup iconCreateFunction={clusterIcon}>
      {/* Your location marker */}
      <Marker position={[coords.lat, coords.lng]} icon={customIcon}>
        <Popup>You are here</Popup>
      </Marker>

      {/* Report markers from Firestore */}
      {reports.map((report) => (
        <Marker
          key={report.id}
          position={[report.lat, report.lng]}
          icon={customAlertIcon}
        >
          <Popup className="custom-popup">
            <CustomPopup report={report} uid={uid} />
          </Popup>
        </Marker>
      ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
};

export default Map;
