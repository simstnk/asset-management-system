const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const auth = require('../middleware/auth');
const { getAll, getOne, create, update, delete: deleteAsset } = require('../controllers/assetController');

// Public: GET semua aset (tidak perlu auth)
router.get('/', getAll);

// Protected: GET detail aset
router.get('/:id', auth, getOne);

// Protected: CREATE, UPDATE, DELETE
router.post('/', auth, upload.single('photo'), create);
router.put('/:id', auth, upload.single('photo'), update);
router.delete('/:id', auth, deleteAsset);

module.exports = router;