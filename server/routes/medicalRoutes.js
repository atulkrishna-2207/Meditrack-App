const express = require("express");
const router = express.Router();
const {
  createMedicalReport,
  getMedicalReport,
} = require("../controllers/medicalController");

router.get("/", getMedicalReport);
router.post("/add", createMedicalReport);

module.exports = router;
