const Appointment = require("../models/Appointment");

const createAppointment = async (req, res) => {
  try {
    const { doctor, patient, date, reason } = req.body;
    const appointment = new Appointment({ doctor, patient, date, reason });
    await appointment.save();
    res.status(201).json(appointment);
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Error creating appointment", error: err.message });
  }
};

const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("doctor", "name specialization")
      .populate("patient", "name email");
    res.status(200).json(appointments);
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Error fetching appointments", error: err.message });
  }
};

module.exports = { createAppointment, getAppointments };
