import { useEffect, useRef, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
  Timestamp,
  writeBatch,
  doc,
} from "firebase/firestore";
import { db } from "./firestore";
import { getDistance } from "../utils/distance";
import { sendNotification } from "../utils/notify";

const RADIUS_M = 500;

export const useReports = (userCoords) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const seenIds = useRef(new Set());

  useEffect(() => {
    if (!userCoords) return;

    const latDelta = RADIUS_M / 111000;
    const lngDelta =
      RADIUS_M / (111000 * Math.cos(userCoords.lat * (Math.PI / 180)));

    const q = query(
      collection(db, "reports"),
      where("expiresAt", ">", Timestamp.now()),
      where("lat", ">", userCoords.lat - latDelta),
      where("lat", "<", userCoords.lat + latDelta),
      orderBy("lat", "asc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const now = Timestamp.now();
        const batch = writeBatch(db);
        let hasDeletions = false;

        const data = snapshot.docs
          .map((d) => ({ id: d.id, ...d.data() }))
          .filter((report) => {
            // cleanup expired
            if (report.expiresAt.seconds <= now.seconds) {
              batch.delete(doc(db, "reports", report.id));
              hasDeletions = true;
              return false;
            }

            // precise 500m circle filter
            const dist = getDistance(userCoords, {
              lat: report.lat,
              lng: report.lng,
            });
            return dist <= RADIUS_M;
          });

        if (hasDeletions) batch.commit();

        // notify for new reports only
        data.forEach((report) => {
          if (!seenIds.current.has(report.id)) {
            sendNotification(report);
            seenIds.current.add(report.id);
          }
        });

        setReports(data);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error("Firestore snapshot error:", err);
        setError("Failed to load reports.");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [userCoords?.lat, userCoords?.lng]);

  return { reports, loading, error };
};