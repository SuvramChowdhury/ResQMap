import Navbar from "./components/Navbar.jsx";
import Navbar2 from "./components/Navbar2.jsx";
import Map from "./components/Map.jsx";
import Footer from "./components/Footer.jsx";
import { useEffect } from "react";
import { initAuth } from "./firebase/auth.js";
import { useLiveLocation } from "./hooks/useLiveLocation.js";

const App = () => {
  const { coords, error, loading } = useLiveLocation();

  useEffect(() => {
    const setupAuth = async () => {
      const uid = await initAuth();
      console.log("User ID:", uid);
    };
    setupAuth();
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <Navbar2 />
      <div className="flex-1 relative">
        <Map coords={coords} error={error} loading={loading} />
      </div>
      <Footer coords={coords} />
    </div>
  );
};

export default App;