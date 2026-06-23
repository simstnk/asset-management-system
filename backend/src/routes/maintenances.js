const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getAll, create, update, delete: deleteMaintenance } = require('../controllers/maintenanceController');

// Public: GET semua maintenance
router.get('/', getAll);

// Protected: CREATE, UPDATE, DELETE
router.post('/', auth, create);
router.put('/:id', auth, update);
router.delete('/:id', auth, deleteMaintenance);

module.exports = router;