// src/pages/Home.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [imgURL, setImgURL] = useState("");
  const navigate = useNavigate();

  const scan = async (image, type) => {
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch(
        "https://serverless.roboflow.com/infer/workflows/sih-ogi4k/custom-workflow-2",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            api_key: "w39UtNteFPVUq5WpXugB",
            inputs: { image: { type, value: image } },
          }),
        }
      );

      const data = await response.json();
      const resltarr = JSON.stringify(data, null, 2); 
      const prediction = JSON.parse(resltarr).outputs[0].model_predictions
; 
      setResult(prediction); setLoading(false) 
      console.log(data);
    } catch (error) {
      console.error("Error during scan:", error);
    }
    setLoading(false);
  };

  const handleFileUpload = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result.split(",")[1];
      setImgURL(reader.result);
      scan(base64String, "base64");
    };
    reader.readAsDataURL(file);
  };

  const handleConfirm = () => {
    navigate("/form", { state: { breed: result?.top, confidence: result?.confidence } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex flex-col items-center px-4 py-6">
      
      {/* Header */}
      <h1 className="text-2xl font-bold text-green-800 mb-6 text-center">
        🐄 Bharat Pashudhan
      </h1>

      {/* Upload Card */}
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-sm border border-green-200">
        <h2 className="text-lg font-semibold text-gray-700 mb-4 text-center">
          Upload Animal Image
        </h2>

        {/* File Upload */}
        <label className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-3 rounded-lg font-semibold cursor-pointer mb-3">
          📸 Upload from Device
          <input
            type="file"
            className="hidden"
            onChange={(e) => handleFileUpload(e.target.files[0])}
          />
        </label>

        {/* Analyze Button */}
        <button
          onClick={() => scan(imgURL, "url")}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold shadow-md"
        >
          🔍 Analyze Image
        </button>
      </div>

      {/* Loading */}
      {loading && (
        <div className="mt-6 text-green-700 font-medium animate-pulse">
          ⏳ Analyzing...
        </div>
      )}

      {/* Preview */}
      {imgURL && (
        <div className="mt-6 bg-white rounded-2xl shadow-md p-3">
          <img
            src={imgURL}
            alt="Preview"
            className="w-64 h-64 object-cover rounded-xl border border-gray-300"
          />
        </div>
      )}

      {/* Prediction Result */}
      {result && (
        <div className="mt-6 bg-white shadow-lg rounded-2xl p-6 w-full max-w-sm border border-green-200 text-center">
          <h2 className="text-lg font-semibold text-green-800 mb-2">
            ✅ Prediction Result
          </h2>
          <p className="text-base text-gray-700">
            <span className="font-bold text-blue-600">
              {(result.confidence * 100).toFixed(2)}%
            </span>{" "}
            sure this is{" "}
            <span className="font-bold text-green-700">{result.top}</span>
          </p>

          <button
            onClick={handleConfirm}
            className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold shadow-md"
          >
            Confirm & Continue ➡️
          </button>
        </div>
      )}
    </div>
  );
}
