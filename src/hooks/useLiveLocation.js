import { useEffect, useRef, useState } from "react";
import { getDistance } from "../utils/distance";

export function useLiveLocation({ distanceThreshold = 15 } = {}) {
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const watchIdRef = useRef(null);

  const startTracking = () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      setLoading(false);
      return;
    }

    setLoading(true);

    // Step 1 — fast coarse position via WiFi/cell
    navigator.geolocation.getCurrentPosition(
      ({ coords: c }) => {
        setCoords({
          lat: c.latitude,
          lng: c.longitude,
          accuracy: c.accuracy,
          heading: c.heading,
          speed: c.speed,
        });
        setLoading(false);
        setError(null);
      },
      () => {},
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 30000 }
    );

    // Step 2 — refine with GPS
    watchIdRef.current = navigator.geolocation.watchPosition(
      ({ coords: c }) => {
        const newCoords = {
          lat: c.latitude,
          lng: c.longitude,
          accuracy: c.accuracy,
          heading: c.heading,
          speed: c.speed,
        };
        setCoords((prev) => {
          if (!prev) return newCoords;
          if (
            newCoords.accuracy &&
            prev.accuracy &&
            newCoords.accuracy > prev.accuracy * 1.5
          )
            return prev;
          const distance = getDistance(prev, newCoords);
          if (distance < distanceThreshold) return prev;
          return newCoords;
        });
        setLoading(false);
        setError(null);
      },
      (err) => {
        switch (err.code) {
          case 1: setError("Location access denied"); break;
          case 2: setError("Position unavailable"); break;
          case 3: setError("Location timeout"); break;
          default: setError("Unknown error");
        }
        setLoading((prev) => (coords ? false : prev));
      },
      { enableHighAccuracy: true, timeout: 30000, maximumAge: 0 }
    );
  };

  const stopTracking = () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
  };

  useEffect(() => {
    startTracking();
    return stopTracking;
  }, []);

  return { coords, error, loading, startTracking, stopTracking };
}