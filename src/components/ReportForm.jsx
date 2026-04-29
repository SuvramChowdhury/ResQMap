import { X, Camera } from "lucide-react";
import { createPortal } from "react-dom";
import { useReportForm } from "../handlers/useReportForm";

const ReportForm = ({ onClose, coords }) => {
  const {
    description,
    setDescription,
    intensity,
    setIntensity,
    photo,
    photoPreview,
    submitting,
    error,
    isMobile,
    handlePhoto,
    handleSubmit,
  } = useReportForm(coords, onClose);

  return createPortal(
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      className="fixed inset-0 z-2147483647 bg-gray-300/30 backdrop-blur-sm flex justify-center items-center font-[Montserrat] p-4"
    >
      <div className="flex flex-col w-full sm:w-1/2 xl:w-1/3 max-h-[90vh]">

        <button className="place-self-end mb-1 text-white" onClick={onClose}>
          <X size={30} />
        </button>

        <div className="bg-gray-800 rounded-xl overflow-y-auto">
          <form className="flex flex-col p-2" onSubmit={handleSubmit}>

            {/* Description */}
            <textarea
              className="bg-gray-500 text-gray-50 rounded-xl h-40 m-2 text-xl px-3 py-2"
              placeholder="Write the Emergency"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={300}
            />

            {/* Intensity */}
            <h3 className="text-2xl text-gray-400 text-center">
              Emergency Rating:
            </h3>
            <div className="m-2 flex flex-wrap gap-4 justify-center text-white">
              {["Critical", "High", "Moderate", "Low"].map((level) => (
                <label
                  key={level}
                  className={`p-2 rounded-2xl cursor-pointer
                    ${level === "Critical" ? "bg-red-600" : ""}
                    ${level === "High" ? "bg-orange-500" : ""}
                    ${level === "Moderate" ? "bg-amber-500" : ""}
                    ${level === "Low" ? "bg-cyan-800" : ""}
                    ${intensity === level ? "ring-2 ring-white scale-105" : ""}
                  `}
                >
                  <input
                    type="radio"
                    name="intensity"
                    value={level}
                    checked={intensity === level}
                    onChange={() => setIntensity(level)}
                    className="mr-1"
                  />
                  {level}
                </label>
              ))}
            </div>

            {/* Photo Upload */}
            <label className="flex gap-2 items-center place-self-center p-2 bg-gray-50 rounded-2xl cursor-pointer">
              <Camera />
              {photo ? photo.name : "Upload Photo"}
              <input
                type="file"
                accept="image/*"
                {...(isMobile ? { capture: "environment" } : {})}
                className="hidden"
                onChange={handlePhoto}
              />
            </label>

            {/* Preview */}
            {photoPreview && (
              <img
                src={photoPreview}
                alt="Preview"
                className="w-24 h-24 object-cover rounded-xl mx-auto mt-2"
              />
            )}

            {/* Error */}
            {error && (
              <p className="text-red-400 text-center text-sm mt-1">{error}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting || !coords}
              className="bg-red-600 m-3 p-2 text-white text-xl rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting
                ? "Submitting..."
                : !coords
                  ? "Getting Location..."
                  : "Submit Report"}
            </button>

          </form>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ReportForm;