import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
// import Dashboard from "./components/ClientManager";
import ForgotPassword from "./components/ForgotPassword";
import './styles/styles.css';
import ClientManager from "./components/ClientManager";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route for Registration */}
          <Route path="/register" element={<Register />} />

          {/* Route for Login */}
          <Route path="/" element={<Login />} />

          {/* Protected Route for Dashboard */}
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}

            {/* Other routes */}
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/ClientManager" element={<ClientManager />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
