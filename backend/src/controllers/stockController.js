const Stock = require('../models/Stock');
const audit = require('../services/auditService');

exports.getAll = async (req, res) => {
  try {
    const stocks = await Stock.find().sort({ createdAt: -1 });
    res.json(stocks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const stock = new Stock(req.body);
    await stock.save();
    await audit.log(
      req.user._id,
      req.user.username,
      'CREATE',
      'Stock',
      stock._id,
      { data: req.body }
    );
    res.status(201).json(stock);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const oldStock = await Stock.findById(req.params.id);
    if (!oldStock) return res.status(404).json({ error: 'Stock not found' });
    const oldData = oldStock.toObject();
    const updated = await Stock.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    await audit.log(
      req.user._id,
      req.user.username,
      'UPDATE',
      'Stock',
      updated._id,
      { old: oldData, new: updated.toObject() }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.id);
    if (!stock) return res.status(404).json({ error: 'Stock not found' });
    const deletedData = stock.toObject();
    await stock.deleteOne();
    await audit.log(
      req.user._id,
      req.user.username,
      'DELETE',
      'Stock',
      req.params.id,
      { deleted: deletedData }
    );
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};