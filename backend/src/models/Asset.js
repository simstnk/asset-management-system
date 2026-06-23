const mongoose = require('mongoose');

const AssetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  division: String,
  location: String,
  status: { type: String, default: 'available' },
  serialNumber: String,
  notes: String,
  photo: { type: String, default: '' }, // path atau URL foto
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Asset', AssetSchema);