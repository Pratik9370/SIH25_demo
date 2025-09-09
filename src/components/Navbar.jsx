import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-green-200 shadow-md flex justify-around py-2">
      <Link to="/home" className="text-green-700 font-semibold">🏠 Home</Link>
      <Link to="/about" className="text-green-700 font-semibold">ℹ️ About</Link>
      <Link to="/profile" className="text-green-700 font-semibold">👤 Profile</Link>
      <Link to="/" className="text-red-600 font-semibold">🚪 Logout</Link>
    </nav>
  );
}
