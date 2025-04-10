const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String },
  image: { type: String },
  email: { type: String, required: true, unique: true },
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
