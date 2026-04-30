import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firestore";

export const useReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [now, setNow] = useState(Timestamp.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Timestamp.now());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const q = query(
      collection(db, "reports"),
      where("expiresAt", ">", Timestamp.now()),
      orderBy("expiresAt", "asc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
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
  }, []);

  const filteredReports = reports.filter(
    (report) => report.expiresAt.seconds > now.seconds
  );

  return { reports: filteredReports, loading, error };
};