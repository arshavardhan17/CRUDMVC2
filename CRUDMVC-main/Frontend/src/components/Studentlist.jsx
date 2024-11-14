import React, { useState, useEffect } from "react";
import axios from "axios";

const Studentlist = () => {
  const apiUrl = "https://crudmvc2-1.onrender.com/api/students";
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    grade: "",
  });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(apiUrl);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
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
      setFormData({ name: "", email: "", grade: "" });
      fetchStudents();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleEdit = (student) => {
    setEditing(student._id);
    setFormData({
      name: student.name,
      email: student.email,
      grade: student.grade,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h1 className="text-4xl font-bold text-center mb-8 text-green-600">
        Student Management System
      </h1>

      <form
        onSubmit={handleSubmit}
        className="mb-8 bg-green-100 p-6 rounded-lg shadow-md"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full pl-4 py-3 bg-white text-gray-800 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full pl-4 py-3 bg-white text-gray-800 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Grade"
              value={formData.grade}
              onChange={(e) =>
                setFormData({ ...formData, grade: e.target.value })
              }
              className="w-full px-4 py-3 bg-white text-gray-800 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-all duration-200 ease-in-out transform hover:scale-105"
        >
          {editing ? "Update Student" : "Add Student"}
        </button>
      </form>

      <div className="grid grid-cols-1 gap-4">
        {students.map((student) => (
          <div
            key={student._id}
            className="bg-white rounded-lg p-4 flex justify-between items-center shadow-md hover:shadow-lg transition duration-300"
          >
            <div>
              <h3 className="font-semibold text-gray-800">{student.name}</h3>
              <p className="text-gray-600">{student.email}</p>
              <p className="text-gray-600">Grade: {student.grade}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(student)}
                className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(student._id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Studentlist;
