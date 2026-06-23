const mongoose = require('mongoose');

const LoanSchema = new mongoose.Schema({
  assetId: { type: mongoose.Schema.Types.ObjectId, ref: 'Asset', required: true },
  assetName: { type: String, required: true },
  borrower: { type: String, required: true },
  department: { type: String, required: true },
  loanDate: { type: Date, required: true },
  returnDate: { type: Date },
  expectedReturnDate: { type: Date, required: true },
  status: { 
    type: String, 
    enum: ['borrowed', 'returned', 'overdue'], 
    default: 'borrowed' 
  },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Loan', LoanSchema);