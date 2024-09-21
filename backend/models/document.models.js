const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  documentType: { type: String, required: true },
  documentURL: { type: String, required: true },  // URL from DigiLocker
  issuedBy: { type: String, required: true },
  issuedDate: { type: Date, required: true },
});

module.exports = mongoose.model('Document', documentSchema);
