import Navbar from "./components/Navbar.jsx";
import Navbar2 from "./components/Navbar2.jsx";
import Map from "./components/Map.jsx";
import Footer from "./components/Footer.jsx";
import { useState, useEffect, use } from "react";
import { initAuth } from "./firebase/auth.js";
import ReportForm from "./components/ReportForm.jsx";
const App = () => {
  useEffect(() => {
    const setupAuth = async () => {
      const uid = await initAuth();
      console.log("User ID:", uid);
    };
    setupAuth();
  }, []);
  return (
    <div className="h-screen">
      <Navbar />
      <Navbar2 />
      <Map />
      <Footer />
    </div>
  );
};
export default App;
