const express = require('express');
const router = express.Router();
const Evidence = require('../models/Evidence');
const { authMiddleware, requireRole } = require('../middleware/authMiddleware');

// Create evidence (officer only)
router.post('/', authMiddleware, requireRole('officer'), async (req, res) => {
  try {
    const { caseId, type, description, imageUrl } = req.body;

    const evidence = await Evidence.create({
      caseId,
      type,
      description,
      imageUrl
    });

    res.status(201).json({ message: 'Evidence added', evidence });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Assign technician (admin/officer)
router.put('/:id/assign', authMiddleware, requireRole(['admin', 'officer']), async (req, res) => {
  try {
    const { technicianId } = req.body;

    const updated = await Evidence.findByIdAndUpdate(
      req.params.id,
      { assignedTo: technicianId },
      { new: true }
    );

    res.json({ message: 'Technician assigned', evidence: updated });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// View technician's assigned evidence
router.get('/my', authMiddleware, requireRole('technician'), async (req, res) => {
  try {
    const evidenceList = await Evidence.find({ assignedTo: req.user.userId })
      .populate('caseId', 'title');

    res.json({ evidence: evidenceList });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Technician updates findings/status
router.put('/:id/update', authMiddleware, requireRole('technician'), async (req, res) => {
  try {
    const { findings, status } = req.body;

    const updated = await Evidence.findByIdAndUpdate(
      req.params.id,
      { findings, status },
      { new: true }
    );

    res.json({ message: 'Evidence updated', evidence: updated });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
