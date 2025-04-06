const express = require("express");
const router = express.Router();
const {
  createPatient,
  getPatients,
} = require("../controllers/patientController");
const protect = require("../middleware/authMiddleware");

router.get("/", getPatients);
router.post("/add", createPatient);

module.exports = router;
