const mongoose = require('mongoose');

const custodyLogSchema = new mongoose.Schema({
  evidenceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Evidence',
    required: true,
  },
  transferredBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  transferredTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  note: {
    type: String,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('CustodyLog', custodyLogSchema);
