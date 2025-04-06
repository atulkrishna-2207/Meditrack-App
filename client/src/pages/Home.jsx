import React, { useEffect, useState } from "react";
import { doctorsAPI } from "../services/api";
import DoctorCard from "../components/DoctorCard";
import { Link } from "react-router-dom";

const Home = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getDoctors = async () => {
      try {
        const { data } = await doctorsAPI.fetch();
        setDoctors(data);
      } catch (err) {
        setError("Failed to load doctors.");
      } finally {
        setLoading(false);
      }
    };
    getDoctors();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 to-purple-200 p-8">
      <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">
        Welcome to Our Hospital
      </h2>

      {/* CTA Links */}
      <div className="flex justify-center gap-6 mb-10">
        <Link
          to="/register"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
          Register
        </Link>
        <Link
          to="/login"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Login
        </Link>
      </div>

      <h3 className="text-2xl font-semibold text-center text-blue-800 mb-6">
        Meet Our Doctors
      </h3>

      {loading ? (
        <p className="text-center text-gray-700 animate-pulse">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : (
        <>
          <div className="flex flex-wrap justify-center gap-6">
            {doctors.slice(0, 6).map((doc) => (
              <DoctorCard key={doc._id} doctor={doc} />
            ))}
          </div>

          {doctors.length > 6 && (
            <div className="text-center mt-10">
              <Link
                to="/doctors"
                className="inline-block bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition"
              >
                View All Doctors
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
