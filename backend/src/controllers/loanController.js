const Loan = require('../models/Loan');
const audit = require('../services/auditService');

exports.getLoans = async (req, res) => {
  try {
    const loans = await Loan.find().sort({ loanDate: -1 });
    res.json(loans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createLoan = async (req, res) => {
  try {
    const { assetId, assetName, borrower, department, loanDate, expectedReturnDate, notes } = req.body;
    if (!assetId || !borrower || !department || !loanDate || !expectedReturnDate) {
      return res.status(400).json({ error: 'Semua field wajib diisi' });
    }
    const existing = await Loan.findOne({ assetId, status: 'borrowed' });
    if (existing) {
      return res.status(400).json({ error: 'Aset sedang dipinjam oleh ' + existing.borrower });
    }
    const loan = new Loan({ assetId, assetName, borrower, department, loanDate, expectedReturnDate, notes });
    await loan.save();
    await audit.log(
      req.user._id,
      req.user.username,
      'CREATE',
      'Loan',
      loan._id,
      { data: req.body }
    );
    res.status(201).json(loan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateLoan = async (req, res) => {
  try {
    const { id } = req.params;
    const { returnDate, status, notes } = req.body;
    const loan = await Loan.findById(id);
    if (!loan) return res.status(404).json({ error: 'Loan not found' });
    const oldData = loan.toObject();
    if (returnDate) {
      loan.returnDate = returnDate;
      loan.status = 'returned';
    }
    if (status) loan.status = status;
    if (notes) loan.notes = notes;
    loan.updatedAt = new Date();
    await loan.save();
    await audit.log(
      req.user._id,
      req.user.username,
      'UPDATE',
      'Loan',
      loan._id,
      { old: oldData, new: loan.toObject() }
    );
    res.json(loan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteLoan = async (req, res) => {
  try {
    const { id } = req.params;
    const loan = await Loan.findById(id);
    if (!loan) return res.status(404).json({ error: 'Loan not found' });
    const deletedData = loan.toObject();
    await loan.deleteOne();
    await audit.log(
      req.user._id,
      req.user.username,
      'DELETE',
      'Loan',
      id,
      { deleted: deletedData }
    );
    res.json({ message: 'Loan deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};