import React, { useState } from "react";
import axios from "axios";

function StatusChecker({ loggedInAadhaar, onStatusUpdate }) {
  const [aadhaar, setAadhaar] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleCheck = async () => {
    try {
      const res = await axios.post("https://aadhar-dbt.onrender.com/api/check-status", {
        aadhaar,
        loggedInAadhaar,
      });

      const status = {
        isAADHARseeded: res.data.isAADHARseeded,
        isDBTenabled: res.data.isDBTenabled,
      };

      setResult(status);
      setError("");

      // Update aurora glow in MainPage
      if (onStatusUpdate) onStatusUpdate(status);
    } catch (err) {
      setError(err.response?.data?.error || "Error checking status");
      setResult(null);
      if (onStatusUpdate)
        onStatusUpdate({ isAADHARseeded: false, isDBTenabled: false }); // fallback to red
    }
  };

  // Helper messages
  const getMessage = (isAADHARseeded, isDBTenabled) => {
    if (!isAADHARseeded && !isDBTenabled)
      return "You need to link your Aadhaar to your bank account and enable DBT.";
    if (isAADHARseeded && !isDBTenabled)
      return "Your Aadhaar is seeded, but DBT is not enabled. Please enable DBT.";
    if (!isAADHARseeded && isDBTenabled)
      return "Error: DBT cannot be enabled if Aadhaar is not seeded."; // Should never happen
    return "Everything is set! Your Aadhaar is seeded and DBT is enabled.";
  };

  return (
    <div style={{ marginTop: "5%", position: "relative" }}>
      <h3 style={{ color: "#fff" }}>Check Your DBT Status</h3>
      <input
        type="text"
        placeholder="Enter Aadhaar Number"
        value={aadhaar}
        onChange={(e) => setAadhaar(e.target.value)}
        style={{
          padding: "12px 16px",
          borderRadius: "9px",
          border: "1px solid #fff",
          outline: "none",
          fontSize: "16px",
          width: "250px",
          backgroundColor: "#000",
          color: "#fff",
          transition: "0.3s",
        }}
        onFocus={(e) => (e.target.style.border = "1px solid #6C63FF")}
        onBlur={(e) => (e.target.style.border = "1px solid #fff")}
      />
      <button
        onClick={handleCheck}
        style={{
          marginLeft: "12px",
          padding: "12px 24px",
          fontSize: "16px",
          fontWeight: "bold",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          background: "linear-gradient(90deg, #6C63FF, #FF6C63)",
          color: "#fff",
          transition: "0.3s",
        }}
        onMouseEnter={(e) =>
          (e.target.style.background = "linear-gradient(90deg, #FF6C63, #6C63FF)")
        }
        onMouseLeave={(e) =>
          (e.target.style.background = "linear-gradient(90deg, #6C63FF, #FF6C63)")
        }
      >
        Check
      </button>

      {result && (
        <div style={{ marginTop: "16px", color: "#fff" }}>
          <p>
            <strong>AADHAR Seeded:</strong>{" "}
            {result.isAADHARseeded ? "✅ Yes" : "❌ No"}
          </p>
          <p>
            <strong>DBT Enabled:</strong>{" "}
            {result.isDBTenabled ? "✅ Yes" : "❌ No"}
          </p>
          <p style={{ marginTop: "8px", fontStyle: "italic" }}>
            {getMessage(result.isAADHARseeded, result.isDBTenabled)}
          </p>
        </div>
      )}

      {error && <p style={{ color: "red", marginTop: "12px" }}>{error}</p>}

      <style>
        {`
          @keyframes glowPulse {
            0% { opacity: 0.3; filter: blur(80px); }
            50% { opacity: 1; filter: blur(120px); }
            100% { opacity: 0.3; filter: blur(80px); }
          }
        `}
      </style>
    </div>
  );
}

export default StatusChecker;