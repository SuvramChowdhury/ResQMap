import { useState, useEffect } from "react";
import { uploadReport } from "../firebase/uploadReport.js";

export const useReportForm = (coords, onClose) => {
  const [description, setDescription] = useState("");
  const [intensity, setIntensity] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be less than 5MB.");
      return;
    }

    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    return () => {
      if (photoPreview) URL.revokeObjectURL(photoPreview);
    };
  }, [photoPreview]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!description.trim() || !intensity) {
      return setError("Please fill in all required fields.");
    }
    if (!photo) {
      return setError("Please upload a photo.");
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
        photo,
      });

      setDescription("");
      setIntensity("");
      setPhoto(null);
      setPhotoPreview(null);
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
    submitting,
    error,
    isMobile,
    handleSubmit,
  };
};