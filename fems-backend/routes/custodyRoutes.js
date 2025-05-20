const express = require('express');
const CustodyLog = require('../models/CustodyLog');
const { authMiddleware } = require('../middleware/authMiddleware');
const { requireRole } = require('../middleware/authMiddleware')
const router = express.Router();

// POST /api/custody — Officer/Technician logs a transfer
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { evidenceId, transferredTo, location, note } = req.body;
    const transferredBy = req.user.userId;

    const log = await CustodyLog.create({
      evidenceId,
      transferredBy,
      transferredTo,
      location,
      note,
    });

    res.status(201).json({ message: 'Custody log recorded', log });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/:evidenceId', authMiddleware, requireRole('admin'), async (req, res) => {
  try {
    const logs = await CustodyLog.find({ evidenceId: req.params.evidenceId })
      .populate('transferredBy', 'name role')
      .populate('transferredTo', 'name role')
      .sort({ timestamp: 1 });

    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
