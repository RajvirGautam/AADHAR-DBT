import React, { useState } from "react";
import axios from "axios";

function LoginPage({ setUser }) {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");

  const handleSendOtp = async () => {
    try {
      await axios.post("http://localhost:6969/api/send-otp", { phone });
      setStep(2);
      setError("");
    } catch (err) {
      setError(err.response?.data?.error || "Error sending OTP");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post("http://localhost:6969/api/verify-otp", {
        phone,
        otp,
      });
      setUser(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Invalid OTP");
    }
  };

  return (
    <div style={{ backgroundColor: "#000", minHeight: "100vh", position: "relative" }}>
      {/* Navbar */}
      <nav
  style={{
    position: "sticky",
    top: 0,
    padding: "40px 5vw", // <-- use viewport width instead of 120px
    maxWidth: "100vw", // <-- prevent overflow
    zIndex: 100,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "left",
   // padding: "40px 120px",
    backdropFilter: "blur(12px)",
    borderRadius: "12px",
    margin: 0, // <-- change this from "8px 16px" to 0
    gap: "40px",
  }}
>
        <div style={{ fontSize: "20px", fontWeight: "700", color: "#fff" }}>Team Tri-state Buffer</div>
        <a href="#" style={{ color: "#fff", textDecoration: "none", fontWeight: "500" }}>
          What is DBT?
        </a>
        <a href="#" style={{ color: "#fff", textDecoration: "none", fontWeight: "500" }}>
          What is Bank Seeding?
        </a>
        <a href="#" style={{ color: "#fff", textDecoration: "none", fontWeight: "500" }}>
          How to enable DBT?
        </a>
       
      </nav>

      {/* Hero Section */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          padding: "80px 20px",
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "60px",
         // overflow: "hidden",
        }}
      >
        {/* Localized Aurora Glow */}
       {/* Localized Aurora Glow */}
<div
  style={{
    position: "absolute",
    top: "10%",
    left: "80%",
    width: "444px",
    height: "536px",
    transform: "translateX(-50%)",
    borderRadius: "50%",
    background: "radial-gradient(circle at center, #06b6d4, #8b5cf6, transparent)",
    filter: "blur(100px)",
    opacity: 0.7,
    zIndex: 0,
    maxWidth: "100%",
    animation: "glowPulse 3s ease-in-out infinite",
  }}
></div>

<style>
{`
  @keyframes glowPulse {
    0% {
      opacity: 0.3;
      filter: blur(80px);
    }
    50% {
      opacity: 1;
      filter: blur(120px);
    }
    100% {
      opacity: 0.3;
      filter: blur(80px);
    }
  }
`}
</style>

        <div style={{ position: "relative", zIndex: 1, maxWidth: "700px" }}>
          {/* Heading */}
          <h1
            style={{
              fontSize: "56px",
              fontWeight: "400",
              color: "#fff",
              lineHeight: "1.2",
            }}
          >
            Check Your Aadhaar DBT Seed Status Instantly
          </h1>

          {/* Subtext */}
          <p
            style={{
              marginTop: "24px",
              fontSize: "18px",
              color: "#9ca3af",
              lineHeight: "1.6",
            }}
          >
            A lot of students face delays in scholarship disbursement due to lack of 
            awareness about Aadhaar-seeded bank accounts. This tool focuses on spreading
            awareness and simplifying the process for hassle-free scholarship transfers
          </p>

          {/* Input + Button */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              step === 1 ? handleSendOtp() : handleVerifyOtp();
            }}
            style={{
              position: "relative",
              marginTop: "48px",
              maxWidth: "500px",
            }}
          >
            {/* Gradient Input Wrapper */}
            <div
              style={{
                position: "relative",
                borderRadius: "9999px",
                padding: "2px",
                background: "linear-gradient(to right, #06b6d4, #8b5cf6)", 
              }}
            >
              <div
                style={{
                  borderRadius: "9999px",
                  backgroundColor: "#000",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: step === 1 ? "56px" : "20px",
                }}
              >
                {step === 1 && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    style={{
                      width: "20px",
                      height: "20px",
                      color: "#666",
                      position: "absolute",
                      left: "20px",
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                )}
                <input
                  type="text"
                  placeholder={step === 1 ? "10-digit mobile number" : "Enter OTP (0000)"}
                  value={step === 1 ? phone : otp}
                  onChange={(e) =>
                    step === 1 ? setPhone(e.target.value) : setOtp(e.target.value)
                  }
                  style={{
                    flex: 1,
                    padding: "16px 20px",
                    border: "none",
                    outline: "none",
                    background: "transparent",
                    color: "#fff",
                    fontSize: "16px",
                    borderRadius: "9999px",
                  }}
                />
              </div>
            </div>

            {/* Button */}
            <div
              style={{
                position: "absolute",
                right: "6px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <button
                type="submit"
                style={{
                  padding: "14px 28px",
                  fontSize: "14px",
                  fontWeight: "600",
                  textTransform: "uppercase",
                  letterSpacing: "2px",
                  color: "#000",
                  backgroundColor: "#fff",
                  border: "none",
                  borderRadius: "9999px",
                  cursor: "pointer",
                  transition: "opacity 0.2s ease-in-out",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = 0.9)}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = 1)}
              >
                {step === 1 ? "Send OTP" : "Verify OTP"}
              </button>
            </div>
          </form>

          {error && (
            <p style={{ color: "red", fontSize: "14px", marginTop: "16px" }}>
              {error}
            </p>
          )}

          <p
            style={{
              fontSize: "12px",
              color: "#aaa",
              marginTop: "24px",
            }}
          >
            By logging in, you consent to verification using Aadhaar-linked mobile number.
          </p>
        </div>
      </section>
    </div>
  );
}

export default LoginPage;