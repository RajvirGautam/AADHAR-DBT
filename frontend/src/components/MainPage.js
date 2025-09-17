import React, { useState } from "react";
import StatusChecker from "./StatusChecker";

function MainPage({ user, setUser }) {
  const [hover, setHover] = useState(false);
  const [auroraColor, setAuroraColor] = useState(
    "radial-gradient(circle at center, #06b6d4, purple, transparent)"
  );

  // This function will be passed to StatusChecker to update aurora
  const handleStatusUpdate = (status) => {
    if (status.isAADHARseeded && status.isDBTenabled) {
      setAuroraColor(
        "radial-gradient(circle at center, #06b6d4, green, transparent)"
      );
    } else {
      setAuroraColor(
        "radial-gradient(circle at center, #06b6d4, red, transparent)"
      );
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#000",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          padding: "40px 5vw",
          maxWidth: "100vw",
          zIndex: 100,
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "left",
          backdropFilter: "blur(12px)",
          borderRadius: "12px",
          margin: 0,
          gap: "40px",
        }}
      >
        <div
          style={{
            fontSize: "20px",
            fontWeight: "700",
            color: "#fff",
          }}
        >
          Team Tri-state Buffer
        </div>
        <a
          href="#"
          style={{ color: "#fff", textDecoration: "none", fontWeight: "500" }}
        >
          What is DBT?
        </a>
        <a
          href="#"
          style={{ color: "#fff", textDecoration: "none", fontWeight: "500" }}
        >
          What is Bank Seeding?
        </a>
        <a
          href="#"
          style={{ color: "#fff", textDecoration: "none", fontWeight: "500" }}
        >
          How to enable DBT?
        </a>

        <button
          onClick={() => setUser(null)}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            position: "absolute",
            top: "30px",
            right: "20px",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1px 1px",
            fontSize: "16px",
            fontWeight: "500",
            color: "#fff",
            backgroundColor: "#000",
            borderRadius: "9999px",
            border: "none",
            cursor: "pointer",
            zIndex: 100,
            overflow: "hidden",
          }}
        >
          <span
            style={{
              position: "absolute",
              top: "-2px",
              left: "-2px",
              right: "-2px",
              bottom: "-2px",
              background: "linear-gradient(90deg, #06b6d4, #8b5cf6)",
              borderRadius: "9999px",
              zIndex: 0,
              transition: "all 0.3s ease",
              filter: "blur(4px)",
            }}
          ></span>

          <span
            style={{
              position: "relative",
              zIndex: 1,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px 28px",
              borderRadius: "9999px",
              backgroundColor: "#000",
            }}
          >
            Logout
          </span>
        </button>
      </nav>

      {/* Localized Aurora Glow */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "75%",
          width: "444px",
          height: "536px",
          transform: "translateX(-50%)",
          borderRadius: "50%",
          background: auroraColor, // dynamic based on status
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
            0% { opacity: 0.3; filter: blur(80px); }
            50% { opacity: 1; filter: blur(120px); }
            100% { opacity: 0.3; filter: blur(80px); }
          }
        `}
      </style>

      {/* Main Content */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          padding: "40px 20px",
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gap: "20px",
        }}
      >
        <h1
          style={{
            fontSize: "56px",
            fontWeight: "400",
            color: "#fff",
            lineHeight: "1.1",
            marginBottom: "0",
          }}
        >
          Hello, {user.name}
        </h1>

        <div style={{ color: "#fff", marginTop: "3%" }}>
          <p>
            <b>Aadhaar number:</b> {user.aadhaar}
          </p>
          <p>
            <b>D.O.B:</b> {user.dob}
          </p>
          <p>
            <b>Phone number:</b> {user.phone}
          </p>

          <StatusChecker
            loggedInAadhaar={user.aadhaar}
            onStatusUpdate={handleStatusUpdate}
          />
        </div>
      </section>
    </div>
  );
}

export default MainPage;