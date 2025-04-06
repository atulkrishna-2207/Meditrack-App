import React, { useEffect, useState } from "react";
import { doctorsAPI } from "../services/api";
import DoctorCard from "../components/DoctorCard";
import {
  FaAmbulance,
  FaStethoscope,
  FaFlask,
  FaHeartbeat,
  FaCapsules,
} from "react-icons/fa";

const Dashboard = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const getDoctors = async () => {
      try {
        const { data } = await doctorsAPI.fetch();
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    getDoctors();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-blue-800">
        Dashboard
      </h2>

      {/* Facilities Section */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold mb-4 text-green-700">
          Facilities We Offer
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Facility icon={<FaAmbulance />} title="24x7 Emergency" />
          <Facility icon={<FaStethoscope />} title="General Consultation" />
          <Facility icon={<FaFlask />} title="Diagnostic Lab" />
          <Facility icon={<FaHeartbeat />} title="Cardiology Unit" />
          <Facility icon={<FaCapsules />} title="In-house Pharmacy" />
          <Facility icon={<FaStethoscope />} title="Physiotherapy" />
        </div>
      </div>

      {/* Doctors Section */}
      <h3 className="text-2xl font-semibold mb-4 text-blue-700">Our Doctors</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {doctors.map((doc) => (
          <DoctorCard key={doc._id} doctor={doc} />
        ))}
      </div>
    </div>
  );
};

// Facility card component
const Facility = ({ icon, title }) => (
  <div className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4 hover:shadow-lg transition">
    <div className="text-3xl text-green-600">{icon}</div>
    <h4 className="text-lg font-medium text-gray-700">{title}</h4>
  </div>
);

export default Dashboard;
