const express = require('express');
const router = express.Router();
const Case = require('../models/Case');
const { authMiddleware, requireRole } = require('../middleware/authMiddleware');

// Create new case (Officer only)
router.post('/', authMiddleware, requireRole('officer'), async (req, res) => {
  try {
    const { title, description } = req.body;

    const newCase = await Case.create({
      title,
      description,
      createdBy: req.user.userId,
    });

    res.status(201).json(newCase);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all cases (any authenticated user)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const cases = await Case.find().populate('createdBy', 'name email role');
    res.json(cases);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Close a case (Admin or Officer)
router.put('/:id/close', authMiddleware, requireRole(['admin', 'officer']), async (req, res) => {
  try {
    const updated = await Case.findByIdAndUpdate(
      req.params.id,
      { status: 'closed' },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: 'Case not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
