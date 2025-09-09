import React from "react";
import { BrowserRouter as Router, Routes, Route, Form } from "react-router-dom";
import Navbar from "./components/Navbar";
import LoginPage from "./components/LoginPage";
import HomePage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import ProfilePage from "./components/ProfilePage";
import FormPage from "./components/Form";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/home" element={<><Navbar /><HomePage /></>} />
        <Route path="/about" element={<><Navbar /><AboutPage /></>} />
        <Route path="/form" element={<><FormPage /></>} />
        <Route path="/profile" element={<><Navbar /><ProfilePage /></>} />
      </Routes>
    </Router>
  );
}
