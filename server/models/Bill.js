const mongoose = require("mongoose");

const billSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  services: [{ type: String }],
  totalAmount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Bill", billSchema);
