const express = require("express");
const router = express.Router();
const { createBill, getBill } = require("../controllers/billingController");

router.get("/", getBill);
router.post("/add", createBill);

module.exports = router;
