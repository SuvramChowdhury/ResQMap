import Navbar from "./components/Navbar.jsx";
import Navbar2 from "./components/Navbar2.jsx";
import Map from "./components/Map.jsx";
import Footer from "./components/Footer.jsx";
import { useEffect, createContext } from "react";
import { initAuth } from "./firebase/auth.js";
import { useLiveLocation } from "./hooks/useLiveLocation.js";
import { useReports } from "./firebase/useReports.js";
import { requestNotificationPermission } from "./utils/notify.js";

const App = () => {
  const { coords, error, loading } = useLiveLocation();
  const { reports,loading,error } = useReports(coords);
  const ReportData = createContext();
  useEffect(() => {
    const setupAuth = async () => {
      const uid = await initAuth();
      console.log("User ID:", uid);
    };
    setupAuth();
    requestNotificationPermission();
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <Navbar2 />
      
      {/*Providing Context to Both Map And Footer Component */}
      <ReportData.Provider value={reports} >

        <div className="flex-1 relative">
          <Map coords={coords} error={error} loading={loading} reports={reports} />
        </div>
        <Footer coords={coords} />

      </ReportData.Provider>
    </div>
  );
};

export default App;