import React, { useState } from "react";
import { voteReport } from "../firebase/voteReport";
import { timeAgo } from "../utils/timeAgo";

const severityStyle = {
  Critical: { color: "#dc2626" },
  High: { color: "#ff4d4f" },
  Moderate: { color: "#fbbf24" },
  Low: { color: "#4ade80" },
};

const ThumbUp = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3z" />
    <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
  </svg>
);

const ThumbDown = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3z" />
    <path d="M17 2h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" />
  </svg>
);

const CustomPopup = ({ report, uid }) => {
  const [voting, setVoting] = useState(false);

  if (!report) return null;

  const sev = severityStyle[report?.intensity] || severityStyle.Moderate;

  const handleVote = async (type) => {
    if (voting || !uid) return;
    setVoting(true);
    try {
      await voteReport(report.id, type, uid);
    } catch (e) {
      console.error(e);
    } finally {
      setVoting(false);
    }
  };

  return (
    <div
      style={{
        width: "280px",
        borderRadius: "18px",
        overflow: "hidden",
        fontFamily: "sans-serif",
        backdropFilter: "blur(14px)",
        background: "rgba(26,26,31,0.9)",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 12px 35px rgba(0,0,0,0.6)",
        margin: "-14px -20px",
      }}
    >
      <div style={{ position: "relative" }}>
        {report.photoURL ? (
          <img
            src={report.photoURL}
            alt="hazard"
            style={{
              width: "100%",
              height: "160px",
              objectFit: "cover",
              filter: "brightness(1.05) contrast(1.05)",
            }}
          />
        ) : (
          <div
            style={{
              height: "100px",
              background: "#111",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#555",
            }}
          >
            No photo
          </div>
        )}

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.45), transparent 60%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "12px",
            left: "12px",
            background: "rgba(0,0,0,0.5)",
            color: sev.color,
            padding: "5px 12px",
            borderRadius: "999px",
            fontSize: "12px",
            fontWeight: 700,
            backdropFilter: "blur(6px)",
          }}
        >
          {report.intensity || "Unknown"}
        </div>
      </div>

      <div style={{ padding: "14px" }}>

        <div
          style={{
            fontSize: "12px",
            color: "#9ca3af",
            marginBottom: "8px",
          }}
        >
          {timeAgo(report.createdAt)}
        </div>

        <p
          style={{
            margin: "0 0 14px",
            fontSize: "15px",
            fontWeight: "500",
            color: "#f9fafb",
            lineHeight: 1.5,
          }}
        >
          {report.description || "No description"}
        </p>

        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <button
            onClick={() => handleVote("up")}
            disabled={voting}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              padding: "8px",
              borderRadius: "12px",
              border: "none",
              background: "rgba(34,197,94,0.18)",
              color: "#4ade80",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease",
              opacity: voting ? 0.6 : 1,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.08)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <ThumbUp /> {report.upvotes ?? 0}
          </button>

          <button
            onClick={() => handleVote("down")}
            disabled={voting}
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              padding: "8px",
              borderRadius: "12px",
              border: "none",
              background: "rgba(239,68,68,0.18)",
              color: "#f87171",
              fontWeight: 600,
              cursor: "pointer",
              transition: "all 0.2s ease",
              opacity: voting ? 0.6 : 1,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.08)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <ThumbDown /> {report.downvotes ?? 0}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomPopup;
