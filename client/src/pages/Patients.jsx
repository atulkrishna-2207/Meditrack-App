import React, { useEffect, useState } from "react";
import { patientsAPI } from "../services/api";
import { FaUserInjured } from "react-icons/fa";

const Patient = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getPatients = async () => {
      try {
        const { data } = await patientsAPI.fetch();
        setPatients(data);
      } catch (err) {
        setError("Failed to fetch patients.");
      } finally {
        setLoading(false);
      }
    };

    getPatients();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-6 flex items-center gap-2 text-green-600">
        <FaUserInjured /> Patients
      </h1>

      {loading ? (
        <p>Loading patients...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : patients.length === 0 ? (
        <p>No patients found.</p>
      ) : (
        <>
          <p className="text-sm text-gray-600 mb-4">
            Total Patients:{" "}
            <span className="font-medium">{patients.length}</span>
          </p>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow-md rounded-lg">
              <thead>
                <tr className="bg-green-100 text-green-800">
                  <th className="py-3 px-4 text-left border-b">Name</th>
                  {/* <th className="py-3 px-4 text-left border-b">Age</th> */}
                  <th className="py-3 px-4 text-left border-b">Email</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient, index) => (
                  <tr
                    key={patient._id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="py-2 px-4 border-b">{patient.name}</td>
                    {/* <td className="py-2 px-4 border-b">{patient.age}</td> */}
                    <td className="py-2 px-4 border-b">{patient.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Patient;
