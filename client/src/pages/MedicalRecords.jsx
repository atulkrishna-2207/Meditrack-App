import React, { useEffect, useState } from "react";
import { medicalAPI } from "../services/api";
import axios from "axios";

const MedicalRecords = () => {
  const [records, setRecords] = useState([]);
  const [formData, setFormData] = useState({
    patientName: "",
    doctorName: "",
    diagnosis: "",
    treatment: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchRecords = async () => {
    try {
      setLoading(true);
      const res = await medicalAPI.fetch();
      setRecords(res.data);
    } catch (err) {
      setError("Failed to fetch records");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      if (!formData.patientName || !formData.diagnosis) {
        setError("Patient name and diagnosis are required.");
        return;
      }
      await axios.post("http://localhost:5000/api/medical/add", formData);
      setFormData({
        patientName: "",
        doctorName: "",
        diagnosis: "",
        treatment: "",
      });
      fetchRecords();
    } catch (err) {
      setError("Failed to add record");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-green-700">
        Medical Records
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md space-y-4 max-w-xl mx-auto"
      >
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input
          name="patientName"
          onChange={handleChange}
          value={formData.patientName}
          placeholder="Patient Name"
          className="border p-2 w-full rounded"
        />
        <input
          name="doctorName"
          onChange={handleChange}
          value={formData.doctorName}
          placeholder="Doctor Name"
          className="border p-2 w-full rounded"
        />
        <input
          name="diagnosis"
          onChange={handleChange}
          value={formData.diagnosis}
          placeholder="Diagnosis"
          className="border p-2 w-full rounded"
        />
        <input
          name="treatment"
          onChange={handleChange}
          value={formData.treatment}
          placeholder="Treatment"
          className="border p-2 w-full rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-60"
          disabled={submitting}
        >
          {submitting ? "Adding..." : "Add Record"}
        </button>
      </form>

      <div className="mt-10 max-w-3xl mx-auto">
        <h3 className="text-xl font-semibold mb-4">All Records:</h3>
        {loading ? (
          <p>Loading records...</p>
        ) : records.length === 0 ? (
          <p>No records found.</p>
        ) : (
          <ul className="space-y-2">
            {records.map((rec, idx) => (
              <li key={idx} className="bg-white p-3 rounded shadow-sm">
                <span className="font-medium text-gray-800">
                  {rec.patientName}
                </span>{" "}
                - <span>{rec.diagnosis}</span>{" "}
                <span className="text-sm text-gray-500">
                  ({new Date(rec.date).toLocaleDateString()})
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MedicalRecords;
