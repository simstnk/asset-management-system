const Location = require('../models/Location');
const audit = require('../services/auditService');

exports.getAll = async (req, res) => {
  try {
    const data = await Location.find().sort({ name: 1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Nama wajib diisi' });
    const existing = await Location.findOne({ name: { $regex: new RegExp('^' + name + '$', 'i') } });
    if (existing) return res.status(400).json({ error: 'Lokasi sudah ada' });
    const data = new Location({ name });
    await data.save();
    if (req.user) {
      await audit.log(
        req.user._id,
        req.user.username,
        'CREATE',
        'Location',
        data._id,
        { data: req.body }
      );
    }
    res.status(201).json(data);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Nama wajib diisi' });
    const existing = await Location.findOne({ name: { $regex: new RegExp('^' + name + '$', 'i') }, _id: { $ne: req.params.id } });
    if (existing) return res.status(400).json({ error: 'Lokasi sudah ada' });
    const old = await Location.findById(req.params.id);
    if (!old) return res.status(404).json({ error: 'Tidak ditemukan' });
    const oldData = old.toObject();
    const updated = await Location.findByIdAndUpdate(req.params.id, { name }, { new: true });
    if (req.user) {
      await audit.log(
        req.user._id,
        req.user.username,
        'UPDATE',
        'Location',
        updated._id,
        { old: oldData, new: updated.toObject() }
      );
    }
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const data = await Location.findById(req.params.id);
    if (!data) return res.status(404).json({ error: 'Tidak ditemukan' });
    const deletedData = data.toObject();
    await data.deleteOne();
    if (req.user) {
      await audit.log(
        req.user._id,
        req.user.username,
        'DELETE',
        'Location',
        req.params.id,
        { deleted: deletedData }
      );
    }
    res.json({ message: 'Dihapus' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};