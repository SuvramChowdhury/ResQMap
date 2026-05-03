import { db } from "./firestore.js";
import {
  collection,
  addDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { initAuth } from "./auth.js";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const uploadToCloudinary = async (photo) => {
  const formData = new FormData();
  formData.append("file", photo);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("folder", "resqmap/reports");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  if (!res.ok) throw new Error("Cloudinary upload failed");

  const data = await res.json();
  const transformedURL = data.secure_url.replace(
    "/upload/",
    "/upload/w_600,h_400,c_fill,q_auto,f_auto/",
  );

  return transformedURL;
};

export const uploadReport = async ({
  description,
  intensity,
  coords,
  photo,
}) => {
  const uid = await initAuth();

  let photoURL = null;
  if (photo) {
    photoURL = await uploadToCloudinary(photo);
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
    votedBy: {},
    createdAt: serverTimestamp(),
    expiresAt: Timestamp.fromDate(new Date(Date.now() + 2 * 60 * 60 * 1000)),
  });

  return docRef.id;
};
