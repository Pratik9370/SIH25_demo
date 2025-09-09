import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function FormPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { breed, confidence } = location.state || {};

  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    color: "",
    ownerName: "",
    ownerPhone: "",
    village: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Final Data:", { breed, confidence, ...formData });
    alert("✅ Animal details submitted successfully!");
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex items-center justify-center px-4 py-6">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-sm border border-green-200">
        <h1 className="text-xl font-bold text-green-800 mb-4 text-center">
          📋 Animal & Owner Details
        </h1>

        <p className="text-gray-700 mb-4 text-center">
          Predicted Breed:{" "}
          <span className="font-bold text-green-700">{breed || "N/A"}</span> <br />
          Confidence:{" "}
          <span className="font-bold text-blue-600">
            {confidence ? (confidence * 100).toFixed(1) + "%" : "N/A"}
          </span>
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="number"
            name="age"
            placeholder="🐮 Age (years)"
            value={formData.age}
            onChange={handleChange}
            className="px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="number"
            name="weight"
            placeholder="⚖️ Weight (kg)"
            value={formData.weight}
            onChange={handleChange}
            className="px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            name="color"
            placeholder="🎨 Color"
            value={formData.color}
            onChange={handleChange}
            className="px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            name="ownerName"
            placeholder="👤 Owner Name"
            value={formData.ownerName}
            onChange={handleChange}
            className="px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="tel"
            name="ownerPhone"
            placeholder="📞 Owner Phone"
            value={formData.ownerPhone}
            onChange={handleChange}
            className="px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            name="village"
            placeholder="🏡 Village"
            value={formData.village}
            onChange={handleChange}
            className="px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold shadow-md w-full"
          >
            ✅ Submit Details
          </button>
        </form>
      </div>
    </div>
  );
}
