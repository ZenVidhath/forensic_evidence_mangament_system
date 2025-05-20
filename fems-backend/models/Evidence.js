const mongoose = require('mongoose');

const evidenceSchema = new mongoose.Schema({
  caseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Case',
    required: true
  },
  type: {
    type: String,
    required: true
  },
  description: String,
  status: {
    type: String,
    default: 'collected', // collected, analyzed, returned
  },
  imageUrl: String,
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Technician
    default: null,
  },
  findings: String
}, { timestamps: true });

module.exports = mongoose.model('Evidence', evidenceSchema);
