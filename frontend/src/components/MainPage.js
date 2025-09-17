import React from "react";
import StatusChecker from "./StatusChecker";

function MainPage({ user, setUser }) {
  return (
    <div>
      <h2>Hello, {user.name}</h2>
      <p><b>Aadhaar:</b> {user.aadhaar}</p>
      <p><b>DOB:</b> {user.dob}</p>
      <p><b>Phone:</b> {user.phone}</p>

      <StatusChecker loggedInAadhaar={user.aadhaar} />

      <button onClick={() => setUser(null)}>Logout</button>
    </div>
  );
}

export default MainPage;