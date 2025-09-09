import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [workerId, setWorkerId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (workerId && password) {
      navigate("/home");
    } else {
      alert("⚠️ Please enter Worker ID and Password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-green-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-sm border border-green-200">
        <h1 className="text-2xl font-bold text-green-800 text-center mb-6">
          🐄 Bharat Pashudhan
        </h1>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="👨‍🌾 Worker ID"
            value={workerId}
            onChange={(e) => setWorkerId(e.target.value)}
            className="px-4 py-3 rounded-lg border w-full focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            placeholder="🔑 Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-3 rounded-lg border w-full focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold shadow-md w-full"
          >
            🔓 Login
          </button>
        </form>
      </div>
    </div>
  );
}
