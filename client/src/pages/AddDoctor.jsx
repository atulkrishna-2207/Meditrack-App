import React, { useEffect, useState } from "react";
import { doctorsAPI } from "../services/api"; // using the new structured API
import { useNavigate } from "react-router-dom";

const AddDoctor = () => {
  const [formData, setFormData] = useState({
    name: "",
    specialization: "",
    email: "",
  });

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch doctors on mount
  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      try {
        const res = await doctorsAPI.fetch();
        setDoctors(res.data);
      } catch (err) {
        console.error("Error fetching doctors:", err);
        setError("Failed to load doctors.");
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await doctorsAPI.add(formData);
      setFormData({ name: "", specialization: "", email: "" });
      const res = await doctorsAPI.fetch(); // refresh doctor list
      setDoctors(res.data);
    } catch (error) {
      console.error("Error adding doctor:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white p-6 rounded shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Add New Doctor</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full px-4 py-2 border rounded"
            required
          />
          <input
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            placeholder="Specialization"
            className="w-full px-4 py-2 border rounded"
            required
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full px-4 py-2 border rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Doctor
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-semibold mb-4">Doctor List</h2>
        {loading ? (
          <p>Loading doctors...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Specialization</th>
                <th className="px-4 py-2 border">Email</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doc) => (
                <tr key={doc._id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{doc.name}</td>
                  <td className="px-4 py-2 border">{doc.specialization}</td>
                  <td className="px-4 py-2 border">{doc.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AddDoctor;
