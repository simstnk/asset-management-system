const Asset = require('../models/Asset');
const fs = require('fs');
const path = require('path');
const audit = require('../services/auditService');

const deletePhotoFile = (photoPath) => {
  if (photoPath) {
    const fullPath = path.join(__dirname, '../../uploads', path.basename(photoPath));
    if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
  }
};

exports.getAll = async (req, res) => {
  try {
    const assets = await Asset.find();
    res.json(assets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);
    if (!asset) return res.status(404).json({ error: 'Asset not found' });
    res.json(asset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { name, category, division, location, status, serialNumber, notes } = req.body;
    const photo = req.file ? `/uploads/${req.file.filename}` : '';
    const asset = new Asset({
      name, category, division, location, status, serialNumber, notes, photo
    });
    await asset.save();
    await audit.log(
      req.user._id,
      req.user.username,
      'CREATE',
      'Asset',
      asset._id,
      { data: req.body }
    );
    res.status(201).json(asset);
  } catch (err) {
    if (req.file) {
      const fullPath = path.join(__dirname, '../../uploads', req.file.filename);
      if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
    }
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);
    if (!asset) return res.status(404).json({ error: 'Asset not found' });

    const oldData = asset.toObject();
    const { name, category, division, location, status, serialNumber, notes } = req.body;
    if (req.file) {
      deletePhotoFile(asset.photo);
      asset.photo = `/uploads/${req.file.filename}`;
    }
    asset.name = name || asset.name;
    asset.category = category || asset.category;
    asset.division = division || asset.division;
    asset.location = location || asset.location;
    asset.status = status || asset.status;
    asset.serialNumber = serialNumber || asset.serialNumber;
    asset.notes = notes || asset.notes;

    await asset.save();
    await audit.log(
      req.user._id,
      req.user.username,
      'UPDATE',
      'Asset',
      asset._id,
      { old: oldData, new: asset.toObject() }
    );
    res.json(asset);
  } catch (err) {
    if (req.file) {
      const fullPath = path.join(__dirname, '../../uploads', req.file.filename);
      if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
    }
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const asset = await Asset.findById(req.params.id);
    if (!asset) return res.status(404).json({ error: 'Asset not found' });
    const deletedData = asset.toObject();
    deletePhotoFile(asset.photo);
    await asset.deleteOne();
    await audit.log(
      req.user._id,
      req.user.username,
      'DELETE',
      'Asset',
      req.params.id,
      { deleted: deletedData }
    );
    res.json({ message: 'Asset deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};