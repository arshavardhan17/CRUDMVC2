import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserTie, FaEnvelope } from "react-icons/fa";

const Facultylist = () => {
  const apiUrl = "https://crudmvc.onrender.com/api/faculty";
  const [faculty, setFaculty] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
  });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      const response = await axios.get(apiUrl);
      setFaculty(response.data);
    } catch (error) {
      console.error("Error fetching faculty:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`${apiUrl}/${editing}`, formData);
        setEditing(null);
      } else {
        await axios.post(apiUrl, formData);
      }
      setFormData({ name: "", email: "", department: "" });
      fetchFaculty();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      fetchFaculty();
    } catch (error) {
      console.error("Error deleting faculty:", error);
    }
  };

  const handleEdit = (faculty) => {
    setEditing(faculty._id);
    setFormData({
      name: faculty.name,
      email: faculty.email,
      department: faculty.department,
    });
  };

  return (
    <div className="min-h-screen bg-white rounded-lg shadow-lg p-6">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-green-600 mb-8">
          Faculty Management Portal
        </h1>
      </div>

      <div className="bg-green-100 shadow-xl rounded-lg p-8 mb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative">
              <FaUserTie className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600" />
              <input
                type="text"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600" />
              <input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Department"
                value={formData.department}
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full md:w-auto px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 flex items-center justify-center gap-2 font-medium"
          >
            {editing ? "Update Faculty" : "Add New Faculty"}
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {faculty.map((member) => (
          <div
            key={member._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300"
          >
            <div className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {member.name}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <FaEnvelope className="text-green-600" />
                    <p>{member.email}</p>
                  </div>
                  <p className="text-gray-600">
                    <span className="font-semibold">Department:</span>{" "}
                    {member.department}
                  </p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                  <button
                    onClick={() => handleEdit(member)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition duration-300"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(member._id)}
                    className="flex items-center justify-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition duration-300"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Facultylist;
