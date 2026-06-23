const Maintenance = require('../models/Maintenance');
const audit = require('../services/auditService');

exports.getAll = async (req, res) => {
  try {
    const data = await Maintenance.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const data = new Maintenance(req.body);
    await data.save();
    await audit.log(
      req.user._id,
      req.user.username,
      'CREATE',
      'Maintenance',
      data._id,
      { data: req.body }
    );
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const old = await Maintenance.findById(req.params.id);
    if (!old) return res.status(404).json({ error: 'Not found' });
    const oldData = old.toObject();
    const updated = await Maintenance.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    await audit.log(
      req.user._id,
      req.user.username,
      'UPDATE',
      'Maintenance',
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
    const data = await Maintenance.findById(req.params.id);
    if (!data) return res.status(404).json({ error: 'Not found' });
    const deletedData = data.toObject();
    await data.deleteOne();
    await audit.log(
      req.user._id,
      req.user.username,
      'DELETE',
      'Maintenance',
      req.params.id,
      { deleted: deletedData }
    );
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};