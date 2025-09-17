import React, { useState } from "react";
import axios from "axios";

function StatusChecker({ loggedInAadhaar }) {
  const [aadhaar, setAadhaar] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleCheck = async () => {
    try {
      const res = await axios.post("http://localhost:6969/api/check-status", {
        aadhaar,
        loggedInAadhaar
      });
      setResult(res.data.status);
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Error checking status");
      setResult(null);
    }
  };

  return (
    <div>
      <h3>Check Your Scholarship Status</h3>
      <input
        type="text"
        placeholder="Enter Aadhaar Number"
        value={aadhaar}
        onChange={(e) => setAadhaar(e.target.value)}
      />
      <button onClick={handleCheck}>Check</button>

      {result && <p>Status: {result}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default StatusChecker;