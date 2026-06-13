const express = require('express');
const router = express.Router();
const Leave = require('../models/Leave');
const auth = require('../middleware/auth');

// GET all leave requests
router.get('/', auth, async (req, res) => {
  try {
    const leaves = await Leave.find().populate('employeeId', 'name email');
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET leave requests by employee ID
router.get('/employee/:employeeId', auth, async (req, res) => {
  try {
    const leaves = await Leave.find({ employeeId: req.params.employeeId });
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST apply for leave
router.post('/', auth, async (req, res) => {
  try {
    const { employeeId, type, startDate, endDate, reason } = req.body;
    const leave = new Leave({ employeeId, type, startDate, endDate, reason });
    await leave.save();
    res.status(201).json(leave);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT approve or reject leave
router.put('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const leave = await Leave.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!leave) return res.status(404).json({ message: 'Leave request not found' });
    res.json(leave);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE leave request
router.delete('/:id', auth, async (req, res) => {
  try {
    await Leave.findByIdAndDelete(req.params.id);
    res.json({ message: 'Leave request deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
