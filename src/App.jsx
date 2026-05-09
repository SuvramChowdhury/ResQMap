import Navbar from "./components/Navbar.jsx";
import Map from "./components/Map.jsx";
import Footer from "./components/Footer.jsx";
import { useEffect, createContext, useState } from "react";
import { initAuth } from "./firebase/auth.js";
import { useLiveLocation } from "./hooks/useLiveLocation.js";
import { useReports } from "./firebase/useReports.js";
import { requestNotificationPermission } from "./utils/notify.js";

export const ReportData = createContext();

const App = () => {
  const {
    coords,
    error: locationError,
    loading: locationLoading,
  } = useLiveLocation();
  const {
    reports,
    loading: reportsLoading,
    error: reportsError,
  } = useReports(coords);

  const [uid, setUid] = useState(null);

  useEffect(() => {
    const setupAuth = async () => {
      const resolvedUid = await initAuth();
      setUid(resolvedUid);
    };
    setupAuth();
    requestNotificationPermission();
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      <ReportData.Provider
        value={{ reports, isLoading: reportsLoading, isError: reportsError }}
      >
        <div className="flex-1 relative ">
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
