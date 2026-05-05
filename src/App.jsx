import Navbar from "./components/Navbar.jsx";
import Navbar2 from "./components/Navbar2.jsx";
import Map from "./components/Map.jsx";
import Footer from "./components/Footer.jsx";
import { useEffect, createContext, useState } from "react";
import { initAuth } from "./firebase/auth.js";
import { useLiveLocation } from "./hooks/useLiveLocation.js";
import { useReports } from "./firebase/useReports.js";
import { requestNotificationPermission } from "./utils/notify.js";

const App = () => {
  const { coords, error, loading } = useLiveLocation();
  const { reports } = useReports(coords);
  const ReportData = createContext();
  const [uid, setUid] = useState(null);
  useEffect(() => {
    const setupAuth = async () => {
      const resolvedUid = await initAuth();
      console.log("User ID:", resolvedUid);
      setUid(resolvedUid);
    };
    setupAuth();
    requestNotificationPermission();
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <Navbar2 />

      {/*Providing Context to Both Map And Footer Component */}
      <ReportData.Provider value={reports}>
        <div className="flex-1 relative">
          <Map
            coords={coords}
            error={error}
            loading={loading}
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
