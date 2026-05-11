import { useState } from "react";
import { useMap, useMapEvents } from "react-leaflet";
import { LocateFixed } from "lucide-react";

function Recenter({ userLocation }) {
  const map = useMap();
  const [showButton, setShowButton] = useState(false);

  useMapEvents({
    dragstart: () => {
      setShowButton(true);
    },

    zoomstart: () => {
      setShowButton(true);
    },
  });

  const handleRecenter = () => {
    if (!userLocation) return;

    map.flyTo(userLocation, 16, {
      duration: 1,
    });

    setShowButton(false);
  };

  if (!showButton) return null;

  return (
    <button
      onClick={handleRecenter}
      className="
        absolute top-8 right-10 z-2147483647
        w-14 h-14 rounded-full
        bg-gray-950/80 backdrop-blur-md
        border-2 border-red-500/70
        shadow-lg shadow-red-500/30
        hover:scale-110
        active:scale-95
        transition-all duration-300
        flex items-center justify-center
      "
    >
      <LocateFixed size={24} className="text-red-500" />
    </button>
  );
}

export default Recenter;