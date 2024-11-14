import React, { useState } from "react";
import axios from "axios";
import { FaUpload } from "react-icons/fa";

const BulkUpload = () => {
  const apiUrl = "https://crudmvc2-1.onrender.com/api/students/bulk-upload";
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
    setError(null);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(`Success! ${response.data.count} students uploaded.`);
      setFile(null);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || "Upload failed");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-3xl font-bold text-green-600 mb-4">
        Bulk Upload Students
      </h2>
      <div className="bg-green-100 p-4 rounded-lg">
        <input
          type="file"
          onChange={handleFileChange}
          className="border-2 border-green-600 rounded-lg p-2 mb-4 w-full"
        />
        {file && <p>Selected file: {file.name}</p>}
        {error && <p className="text-red-600">{error}</p>}
        {message && <p className="text-green-600">{message}</p>}
        <button
          onClick={handleUpload}
          disabled={!file}
          className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300 flex items-center justify-center gap-2"
        >
          <FaUpload /> Upload Students
        </button>
      </div>
    </div>
  );
};

export default BulkUpload;
