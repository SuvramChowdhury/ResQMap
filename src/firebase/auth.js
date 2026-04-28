import { getAuth, signInAnonymously } from "firebase/auth";
import { app } from "./config";
const auth = getAuth(app);

export const initAuth = async () => {
  if (!auth.currentUser) {
    const userCredential = await signInAnonymously(auth);
    return userCredential.user.uid;
  }
  return auth.currentUser.uid;
};
