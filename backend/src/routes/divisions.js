const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getAll, create, update, delete: deleteDivision } = require('../controllers/divisionController');

// GET tidak perlu auth (bisa diakses publik)
router.get('/', getAll);

// POST, PUT, DELETE harus login (pakai auth)
router.post('/', auth, create);
router.put('/:id', auth, update);
router.delete('/:id', auth, deleteDivision);

module.exports = router;