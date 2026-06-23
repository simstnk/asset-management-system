const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  date: { type: String, required: true },
  activity: { type: String, required: true },
  division: { type: String, required: true },
  assignedTo: { type: String, default: '' },
  status: { type: String, enum: ['done', 'pending', 'cancelled'], default: 'done' },
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

module.exports = mongoose.model('Activity', ActivitySchema);