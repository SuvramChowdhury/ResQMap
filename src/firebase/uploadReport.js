import { db } from "./firestore.js";
import {
  collection,
  addDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const compressImage = (file, maxPx = 1280, quality = 0.82) =>
  new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxPx / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(resolve, "image/jpeg", quality);
      URL.revokeObjectURL(img.src);
    };
    img.src = URL.createObjectURL(file);
  });


export const uploadToCloudinary = async (photo) => {
  const compressed = await compressImage(photo);

  const formData = new FormData();
  formData.append("file", compressed);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("folder", "resqmap/reports");

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: "POST", body: formData },
  );

  if (!res.ok) throw new Error("Cloudinary upload failed");

  const data = await res.json();

  return data.secure_url.replace(
    "/upload/",
    "/upload/w_600,h_400,c_fill,q_auto,f_auto/",
  );
};


export const uploadReport = async ({
  description,
  intensity,
  coords,
  photoURL, 
}) => {
  const uid = getAuth().currentUser?.uid;
  if (!uid) throw new Error("Not authenticated");

  const docRef = await addDoc(collection(db, "reports"), {
    uid,
    description,
    intensity,
    photoURL: photoURL ?? null,
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