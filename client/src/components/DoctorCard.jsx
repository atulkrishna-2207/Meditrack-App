import React from "react";

const DoctorCard = ({ doctor }) => {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h3 className="text-lg font-bold">{doctor.name}</h3>
      {/* <p className="text-gray-600">{doctor.specialization}</p> */}
      <p className="text-sm text-gray-500">{doctor.email}</p>
    </div>
  );
};

export default DoctorCard;
