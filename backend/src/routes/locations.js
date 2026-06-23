const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getAll, create, update, delete: deleteLocation } = require('../controllers/locationController');

router.get('/', getAll);
router.post('/', auth, create);
router.put('/:id', auth, update);
router.delete('/:id', auth, deleteLocation);

module.exports = router;