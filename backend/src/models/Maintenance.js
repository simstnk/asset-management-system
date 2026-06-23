const mongoose = require('mongoose');

const MaintenanceSchema = new mongoose.Schema({
  asset: { type: String, required: true },
  scheduledDate: { type: String, required: true },
  type: { type: String, enum: ['Preventive', 'Corrective', 'Predictive', 'Rutin'], default: 'Preventive' },
  status: { type: String, enum: ['pending', 'done', 'cancelled'], default: 'pending' },
  assignedTo: { type: String, default: '' },
  notes: { type: String, default: '' },
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

module.exports = mongoose.model('Maintenance', MaintenanceSchema);