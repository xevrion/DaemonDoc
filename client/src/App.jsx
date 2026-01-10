import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import OauthVerify from "./pages/OauthVerify";
import LandingPage from "./pages/Landing";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/oauth-success" element={<OauthVerify />} />
      </Routes>
    </div>
  );
};

export default App;
