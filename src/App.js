import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";

const App = () => {
  const location = useLocation();
  const isProfileVisible = location.pathname !== "/profile";

  return (
    <div>
      {isProfileVisible && (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            SignUp
          </Link>
          <Link to={"/signin"} className="navbar-brand">
            SignIn
          </Link>
        </nav>
      )}

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;