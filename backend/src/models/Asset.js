const mongoose = require('mongoose');

const AssetSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  division: String,
  location: String,
  status: { type: String, default: 'available' },
  serialNumber: String,
  notes: String,
  photo: { type: String, default: '' },
  assetCode: { type: String, unique: true, sparse: true }, // <-- TAMBAHKAN INI
  createdAt: { type: Date, default: Date.now }
});

// Auto-generate assetCode jika kosong
AssetSchema.pre('save', async function(next) {
  if (!this.assetCode) {
    const count = await this.constructor.countDocuments();
    const nextNumber = count + 1;
    this.assetCode = 'AST-' + String(nextNumber).padStart(4, '0');
  }
  next();
});

module.exports = mongoose.model('Asset', AssetSchema);