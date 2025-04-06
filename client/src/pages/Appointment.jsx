import React, { useState, useEffect } from "react";
import { doctorsAPI, patientsAPI, appointmentsAPI } from "../services/api";

const Appointment = () => {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    doctor: "",
    patient: "",
    date: "",
    reason: "",
  });

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [doctorRes, patientRes] = await Promise.all([
          doctorsAPI.fetch(),
          patientsAPI.fetch(),
        ]);
        setDoctors(doctorRes.data);
        setPatients(patientRes.data);
      } catch (err) {
        console.error("Error loading data", err);
      }
    };

    loadInitialData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await appointmentsAPI.add(formData);
      alert("Appointment successfully booked!");
      setFormData({ doctor: "", patient: "", date: "", reason: "" });
    } catch (err) {
      console.error("Error creating appointment:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow p-6 rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Book Appointment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          name="doctor"
          onChange={handleChange}
          value={formData.doctor}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="">Select Doctor</option>
          {doctors.map((doc) => (
            <option key={doc._id} value={doc._id}>
              {doc.name} ({doc.specialization})
            </option>
          ))}
        </select>

        <select
          name="patient"
          onChange={handleChange}
          value={formData.patient}
          className="w-full border px-3 py-2 rounded"
          required
        >
          <option value="">Select Patient</option>
          {patients.map((pat) => (
            <option key={pat._id} value={pat._id}>
              {pat.name}
            </option>
          ))}
        </select>

        <input
          type="datetime-local"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />

        <textarea
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          placeholder="Reason"
          className="w-full border px-3 py-2 rounded"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded w-full hover:bg-blue-700"
        >
          Book Appointment
        </button>
      </form>
    </div>
  );
};

export default Appointment;
