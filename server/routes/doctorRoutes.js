const express = require("express");
const router = express.Router();
const { getDoctors, createDoctor } = require("../controllers/doctorController");

router.get("/", getDoctors);
router.post("/add", createDoctor);

module.exports = router;
