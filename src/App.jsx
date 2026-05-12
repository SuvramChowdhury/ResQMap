import Navbar from "./components/Navbar.jsx";
import Map from "./components/Map.jsx";
import Footer from "./components/Footer.jsx";
import { useEffect, createContext, useState } from "react";
import { initAuth } from "./firebase/auth.js";
import { useLiveLocation } from "./hooks/useLiveLocation.js";
import { useReports } from "./firebase/useReports.js";
import { requestNotificationPermission } from "./utils/notify.js";
import {
  collection,
  query,
  where,
  getDocs,
  writeBatch,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase/firestore";

export const ReportData = createContext();

const cleanupExpiredReports = async () => {
  const q = query(
    collection(db, "reports"),
    where("expiresAt", "<", Timestamp.now()),
  );
  const snapshot = await getDocs(q);
  if (snapshot.empty) return;
  const batch = writeBatch(db);
  snapshot.docs.forEach((doc) => batch.delete(doc.ref));
  await batch.commit();
};

const App = () => {
  const {
    coords,
    error: locationError,
    loading: locationLoading,
  } = useLiveLocation();

  const [uid, setUid] = useState(null);
  const {
    reports,
    loading: reportsLoading,
    error: reportsError,
  } = useReports(coords);

  useEffect(() => {
    const setupAuth = async () => {
      const resolvedUid = await initAuth();
      setUid(resolvedUid);
    };
    setupAuth();
    requestNotificationPermission();
    cleanupExpiredReports().catch(console.error);
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <ReportData.Provider
        value={{ reports, isLoading: reportsLoading, isError: reportsError }}
      >
        <div className="flex-1 relative">
          <Map
            coords={coords}
            error={locationError}
            loading={locationLoading}
            reports={reports}
            uid={uid}
          />
        </div>
        <Footer coords={coords} />
      </ReportData.Provider>
    </div>
  );
};

export default App;
