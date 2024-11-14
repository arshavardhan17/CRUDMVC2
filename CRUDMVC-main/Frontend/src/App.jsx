import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Studentlist from "./components/Studentlist";
import Facultylist from "./components/Facultylist";
import BulkUpload from "./components/BulkUpload";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <nav className="bg-gradient-to-r from-white to-green-500 border-b border-green-400">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between h-16">
              <div className="flex items-center space-x-8">
                <Link
                  to="/students"
                  className="text-green-500 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-all duration-200 ease-in-out transform hover:scale-105"
                >
                  Students
                </Link>
                <Link
                  to="/faculty"
                  className="text-green-500 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-all duration-200 ease-in-out transform hover:scale-105"
                >
                  Faculty
                </Link>
                <Link
                  to="/bulk-upload"
                  className="text-green-500 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition-all duration-200 ease-in-out transform hover:scale-105"
                >
                  Bulk Upload
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Studentlist />} />
            <Route path="/students" element={<Studentlist />} />
            <Route path="/faculty" element={<Facultylist />} />
            <Route path="/bulk-upload" element={<BulkUpload />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
