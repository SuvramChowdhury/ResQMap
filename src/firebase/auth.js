import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";
import { app } from "./config";

const auth = getAuth(app);

export const initAuth = () => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      unsubscribe(); 
      if (!user) {
        const credential = await signInAnonymously(auth);
        resolve(credential.user.uid);
      } else {
        resolve(user.uid);
      }
    });
  });
};