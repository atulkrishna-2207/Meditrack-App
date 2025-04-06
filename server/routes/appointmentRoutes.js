const express = require("express");
const router = express.Router();
const {
  createAppointment,
  getAppointments,
} = require("../controllers/appointmentController");
const protect = require("../middleware/authMiddleware");

router.get("/", getAppointments);
router.post("/add", createAppointment);

module.exports = router;
