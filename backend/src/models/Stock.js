const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
  assetName: { type: String, required: true },
  quantity: { type: Number, default: 0 },
  minStock: { type: Number, default: 5 },
  location: { type: String, required: true },
  status: { type: String, enum: ['available', 'low', 'depleted'], default: 'available' },
  createdAt: { type: Date, default: Date.now }
}, {
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

module.exports = mongoose.model('Stock', StockSchema);