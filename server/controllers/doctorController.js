const Doctor = require("../models/Doctor");

const createDoctor = async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    await doctor.save();
    res.status(201).json(doctor);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Failed to create doctor", error: error.message });
  }
};

const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Failed to fetch doctors", error: error.message });
  }
};

module.exports = { createDoctor, getDoctors };
