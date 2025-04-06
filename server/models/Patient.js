const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: Number,
    gender: String,
    email: { type: String, required: true, unique: true },
    phone: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patient", patientSchema);
