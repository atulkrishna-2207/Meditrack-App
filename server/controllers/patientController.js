const Patient = require("../models/Patient");

const createPatient = async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json(patient);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Failed to create patient", error: error.message });
  }
};

const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Failed to fetch patients", error: error.message });
  }
};

module.exports = { createPatient, getPatients };
