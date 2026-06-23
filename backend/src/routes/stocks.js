const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getAll, create, update, delete: deleteStock } = require('../controllers/stockController');

// Public: GET semua stok (tidak perlu auth)
router.get('/', getAll);

// Protected: CREATE, UPDATE, DELETE
router.post('/', auth, create);
router.put('/:id', auth, update);
router.delete('/:id', auth, deleteStock);

module.exports = router;