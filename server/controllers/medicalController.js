const MedicalRecord = require("../models/MedicalRecord");

const createMedicalReport = async (req, res) => {
  try {
    const record = new MedicalRecord(req.body);
    await record.save();
    res.status(201).json(record);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const getMedicalReport = async (req, res) => {
  try {
    const records = await MedicalRecord.find();
    res.json(records);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = { createMedicalReport, getMedicalReport };
