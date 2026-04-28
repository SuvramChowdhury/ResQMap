import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBS2LtW43JJSos2FBj7HCVf3sCaWs4GY-g",
  authDomain: "resqmap-bc77e.firebaseapp.com",
  projectId: "resqmap-bc77e",
  storageBucket: "resqmap-bc77e.firebasestorage.app",
  messagingSenderId: "872902199553",
  appId: "1:872902199553:web:4279467afad48cd10f7300"
};

export const app = initializeApp(firebaseConfig);