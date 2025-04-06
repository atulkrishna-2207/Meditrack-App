const Bill = require("../models/Bill");

const createBill = async (req, res) => {
  try {
    const bill = new Bill(req.body);
    await bill.save();
    res.status(201).json(bill);
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

const getBill = async (req, res) => {
  try {
    const bills = await Bill.find();
    res.json(bills);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = { createBill, getBill };
