import React, { useState } from "react";

export default function BreedRecognizerUI() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState();
  const [imgURL, setImgURL] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const scan = async (image, type) => {
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('https://serverless.roboflow.com/infer/workflows/sih-ogi4k/custom-workflow-2',
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            api_key: "w39UtNteFPVUq5WpXugB",
            inputs: {
              image: { type, value: image },
            },
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
      console.log(base64String)
      scan(base64String, "base64");
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold text-white mb-8 tracking-wide">
        Cattle & Buffalo Breed Recognizer
      </h1>

      {/* Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          scan(imgURL, "url");
        }}
        className="w-full max-w-md flex flex-col gap-4"
      >
        <input
          type="text"
          className="flex-1 text-white px-4 py-3 rounded-lg border border-gray-500 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="🔗 Enter image URL"
          value={imgURL}
          onChange={(e) => { setImgURL(e.target.value); setResult(null) }}
        />

        {/* Drag & Drop Zone */}
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`w-full p-6 border-2 border-dashed rounded-xl text-center transition ${
            dragActive ? "border-blue-400 bg-gray-800" : "border-gray-600 bg-gray-900"
          }`}
        >
          <p className="text-gray-300">📂 Drag & Drop an image here</p>
          <p className="text-sm text-gray-500 mt-1">or</p>
          <input
            type="file"
            id="fileUpload"
            onChange={(e) => handleFileUpload(e.target.files[0])}
            className="hidden"
          />
          <label
            htmlFor="fileUpload"
            className="mt-2 inline-block cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition"
          >
            Browse Files
          </label>
        </div>

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg font-semibold shadow-md transition duration-200"
        >
          🔍 Analyze URL
        </button>
      </form>

      {/* Loading */}
      {loading && <span className="text-white mt-6 font-medium animate-pulse">⏳ Analyzing...</span>}

      {/* Preview */}
      {result && imgURL && (
        <div className="mt-6">
          <img
            src={imgURL}
            alt="Preview"
            className="w-72 h-72 object-cover rounded-xl shadow-lg border border-gray-700"
          />
        </div>
      )}

      {/* Prediction */}
      {result && result.confidence && (
        <div className="mt-6 bg-gray-800 text-white p-6 rounded-xl shadow-lg w-full max-w-md text-center">
          <h2 className="text-xl font-semibold mb-3">Prediction Result</h2>
          <p className="text-lg">
            <span className="font-bold text-blue-400">
              {(result.confidence * 100).toFixed(2)}%
            </span>{" "}
            confident this is{" "}
            <span className="font-bold text-green-400">{result.top}</span>
          </p>
        </div>
      )}
    </div>
  );
}
