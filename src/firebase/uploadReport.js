import { db } from "./firestore.js";
import { storage } from "./storage.js";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { initAuth } from "./auth.js";
export const uploadReport = async ({
  description,
  intensity,
  coords,
  photo,
}) => {
  const uid = await initAuth();
  let photoURL = null;
  if (photo) {
    const storageRef = ref(storage, `reports/${uid}/${Date.now()}`);
    await uploadBytes(storageRef, photo);
    photoURL = await getDownloadURL(storageRef);
  }

  const docRef = await addDoc(collection(db, "reports"), {
    uid,
    description,
    intensity,
    photoURL,
    lat: coords.lat,
    lng: coords.lng,
    upvotes: 0,
    downvotes: 0,
    createdAt: serverTimestamp(),
    expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000), // Expires in 2 hours
  });
  return docRef.id;
};
