import React, { useState } from "react";
import LoginPage from "./components/LoginPage";
import MainPage from "./components/MainPage";

function App() {
  const [user, setUser] = useState(null); // null until login

  return (
    <div>
      {!user ? (
        <LoginPage setUser={setUser} />
      ) : (
        <MainPage user={user} setUser={setUser} />
      )}
    </div>
  );
}

export default App;