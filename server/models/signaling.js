const mongoose = require('mongoose');

const signalingSchema = new mongoose.Schema({
  caller: {
    type: String,
    required: true
  },
  receiver: {
    type: String, 
    required: true
  },
  callerOffer: {
    type: Object,
    required: false
  },
  callerCandidates: {
    type: [Object]
  },
  receiverAnswer: {
    type: Object,
    required: false
  },
  receiverCandidates: {
    type: [Object]
  }
});

const Signaling = mongoose.model('Signaling', signalingSchema);

module.exports = Signaling;
