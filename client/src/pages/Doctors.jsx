import React, { useEffect, useState } from "react";
import { doctorsAPI } from "../services/api";
import { FaUserMd } from "react-icons/fa";

const Doctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getDoctors = async () => {
      try {
        const { data } = await doctorsAPI.fetch();
        setDoctors(data);
      } catch (err) {
        setError("Failed to fetch doctors.");
      } finally {
        setLoading(false);
      }
    };

    getDoctors();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-blue-600">
          <FaUserMd /> Doctors
        </h1>
        {/* Optional Add Doctor button (if functionality added later) */}
        {/* <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          + Add Doctor
        </button> */}
      </div>

      {loading ? (
        <p className="text-gray-600 animate-pulse">Loading doctors...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : doctors.length === 0 ? (
        <p className="text-gray-600 italic">No doctors found.</p>
      ) : (
        <div className="overflow-x-auto rounded shadow">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-blue-100 text-blue-800">
                <th className="py-3 px-4 text-left">Name</th>
                {/* <th className="py-3 px-4 text-left">Specialization</th> */}
                <th className="py-3 px-4 text-left">Email</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor._id} className="border-t hover:bg-gray-50">
                  <td className="py-2 px-4">{doctor.name}</td>
                  {/* <td className="py-2 px-4">{doctor.specialization}</td> */}
                  <td className="py-2 px-4">{doctor.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Doctor;
