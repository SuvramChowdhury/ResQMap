import { useState, useEffect } from "react";
import { uploadReport, uploadToCloudinary } from "../firebase/uploadReport.js";

export const useReportForm = (coords, onClose) => {
  const [description, setDescription] = useState("");
  const [intensity, setIntensity] = useState("");

  // Raw file for preview; resolved URL stored separately
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [photoURL, setPhotoURL] = useState(null); // ← set as soon as upload finishes
  const [uploading, setUploading] = useState(false); // ← background upload in progress

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  // ─── Pick photo → compress & upload immediately in the background ───────────
  const handlePhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed.");
      return;
    }

    // Show local preview instantly
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
    setPhotoURL(null);
    setError("");

    // Upload in background while the user fills in the rest of the form
    setUploading(true);
    try {
      const url = await uploadToCloudinary(file);
      setPhotoURL(url);
    } catch {
      setError("Photo upload failed. Please try again.");
      setPhoto(null);
      setPhotoPreview(null);
    } finally {
      setUploading(false);
    }
  };

  // Revoke object URL when preview changes or component unmounts
  useEffect(() => {
    return () => {
      if (photoPreview) URL.revokeObjectURL(photoPreview);
    };
  }, [photoPreview]);

  // ─── Submit — only writes to Firestore, no Cloudinary wait ─────────────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!description.trim() || !intensity) {
      return setError("Please fill in all required fields.");
    }
    if (!photo) {
      return setError("Please upload a photo.");
    }
    if (uploading) {
      return setError("Photo is still uploading — please wait a moment.");
    }
    if (!photoURL) {
      return setError("Photo upload failed. Please re-select your photo.");
    }
    if (!coords) {
      return setError("Location not available.");
    }

    try {
      setSubmitting(true);
      await uploadReport({
        description: description.trim(),
        intensity,
        coords,
        photoURL, // ← already resolved, no upload delay
      });

      // Reset form
      setDescription("");
      setIntensity("");
      setPhoto(null);
      setPhotoPreview(null);
      setPhotoURL(null);
      onClose?.();
    } catch (err) {
      console.error(err);
      setError("Failed to submit report. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return {
    description,
    setDescription,
    intensity,
    setIntensity,
    photo,
    handlePhoto,
    photoPreview,
    uploading, // expose so ReportForm can show a spinner on the camera button
    submitting,
    error,
    isMobile,
    handleSubmit,
  };
};
