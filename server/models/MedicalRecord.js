const mongoose = require("mongoose");

const medicalRecordSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  doctorName: { type: String, required: true },
  diagnosis: { type: String, required: true },
  treatment: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("MedicalRecord", medicalRecordSchema);
