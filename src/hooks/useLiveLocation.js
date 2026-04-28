import { useEffect, useRef, useState } from "react";
import { getDistance } from "../utils/distance";


export function useLiveLocation({
  enableHighAccuracy = true,
  timeout = 10000,
  maximumAge = 5000,
  distanceThreshold = 15,
} = {}) {
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
          if(!prev) return newCoords;
          const distance = getDistance(prev, newCoords);

          if (distance < distanceThreshold) return prev;

          return newCoords;
        });

        setLoading(false);
        setError(null);
      },
      (err) => {
        switch (err.code) {
          case 1:
            setError("Location Access denied");
            break;
          case 2:
            setError("Position unavailable");
            break;
          case 3:
            setError("Location timeout");
            break;
          default:
            setError("Unknown error");
        }
        setLoading(false);
      },
      {
        enableHighAccuracy,
        timeout,
        maximumAge,
      },
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

  return {
    coords,
    error,
    loading,
    startTracking,
    stopTracking,
  };
}
