import React, { useState } from "react";

export default function BreedRecognizerUI() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState();
  const [imgURL, setImgURL] = useState("");

  const scan = async (image) => {
    setLoading(true)
    setResult(null)
    const response = await fetch(
      "https://serverless.roboflow.com/infer/workflows/sih-ogi4k/custom-workflow-2",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          api_key: "w39UtNteFPVUq5WpXugB",
          inputs: {
            image: { type: "url", value: image },
          },
        }),
      }
      
    );

    const data = await response.json();
    const resltarr = JSON.stringify(data, null, 2);
    const prediction = JSON.parse(resltarr).outputs[0].predictions;
    setResult(prediction);
    setLoading(false)
    console.log(prediction);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-white mb-6 tracking-wide">
        Cattle & Buffalo Breed Recognizer
      </h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          scan(imgURL);
        }}
        className="w-full max-w-md flex gap-2"
      >
        <input
          type="text"
          className="flex-1 text-white px-4 py-2 rounded-lg border border-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter image URL"
          value={imgURL}
          onChange={(e) => {setImgURL(e.target.value), setResult(null)}}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md transition duration-200"
        >
          Submit
        </button>
      </form>

      {loading ? <span className="text-white font">Loading...</span>: (
        <div>

          {result && imgURL && (
          <div className="mt-6">
            <img
              src={imgURL}
              alt="Preview"
              className="w-64 h-64 object-cover rounded-xl shadow-lg border border-gray-700"
            />
          </div>
          )}


          {result && result.confidence && (
          <div className="mt-6 bg-gray-800 text-white p-4 rounded-xl shadow-lg w-full max-w-md text-center">
            <h2 className="text-xl font-semibold mb-2">Prediction</h2>
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
      )}


    </div>
  );
}
