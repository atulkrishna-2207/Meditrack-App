import React, { useEffect, useState } from "react";
import { billingAPI } from "../services/api";

const Billing = () => {
  const [bills, setBills] = useState([]);
  const [formData, setFormData] = useState({
    patientName: "",
    services: "",
    totalAmount: "",
  });

  const fetchBills = async () => {
    try {
      const res = await billingAPI.fetch();
      setBills(res.data);
    } catch (err) {
      console.error("Error fetching bills:", err);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      services: formData.services.split(",").map((s) => s.trim()),
      totalAmount: Number(formData.totalAmount),
    };

    try {
      await billingAPI.add(payload);
      fetchBills();
      setFormData({
        patientName: "",
        services: "",
        totalAmount: "",
      });
    } catch (err) {
      console.error("Error adding bill:", err);
      alert("Failed to add bill");
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow p-6 rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Billing</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="patientName"
          value={formData.patientName}
          onChange={handleChange}
          placeholder="Patient Name"
          className="border p-2 w-full rounded"
          required
        />
        <input
          name="services"
          value={formData.services}
          onChange={handleChange}
          placeholder="Services (comma separated)"
          className="border p-2 w-full rounded"
          required
        />
        <input
          name="totalAmount"
          type="number"
          value={formData.totalAmount}
          onChange={handleChange}
          placeholder="Total Amount"
          className="border p-2 w-full rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
        >
          Add Bill
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">All Bills:</h3>
        <ul className="list-disc pl-6 space-y-1">
          {bills.map((bill, idx) => (
            <li key={idx}>
              <strong>{bill.patientName}</strong> - ₹{bill.totalAmount} (
              {new Date(bill.date).toLocaleDateString()})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Billing;
