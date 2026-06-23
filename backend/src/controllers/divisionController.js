const Division = require('../models/Division');
const audit = require('../services/auditService');

exports.getAll = async (req, res) => {
  try {
    const data = await Division.find().sort({ name: 1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    // CEK: Pastikan user sudah login
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized - please login first' });
    }

    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Nama wajib diisi' });

    const existing = await Division.findOne({ 
      name: { $regex: new RegExp('^' + name + '$', 'i') } 
    });
    if (existing) return res.status(400).json({ error: 'Divisi sudah ada' });

    const data = new Division({ name });
    await data.save();

    // Catat audit log
    await audit.log(
      req.user._id,
      req.user.username,
      'CREATE',
      'Division',
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
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized - please login first' });
    }

    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Nama wajib diisi' });

    const existing = await Division.findOne({ 
      name: { $regex: new RegExp('^' + name + '$', 'i') }, 
      _id: { $ne: req.params.id } 
    });
    if (existing) return res.status(400).json({ error: 'Divisi sudah ada' });

    const old = await Division.findById(req.params.id);
    if (!old) return res.status(404).json({ error: 'Tidak ditemukan' });
    const oldData = old.toObject();

    const updated = await Division.findByIdAndUpdate(req.params.id, { name }, { new: true });

    await audit.log(
      req.user._id,
      req.user.username,
      'UPDATE',
      'Division',
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
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized - please login first' });
    }

    const data = await Division.findById(req.params.id);
    if (!data) return res.status(404).json({ error: 'Tidak ditemukan' });
    const deletedData = data.toObject();
    await data.deleteOne();

    await audit.log(
      req.user._id,
      req.user.username,
      'DELETE',
      'Division',
      req.params.id,
      { deleted: deletedData }
    );

    res.json({ message: 'Dihapus' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};