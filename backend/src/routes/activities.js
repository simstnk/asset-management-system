const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getAll, create, update, delete: deleteActivity } = require('../controllers/activityController');

// Public: GET semua aktivitas
router.get('/', getAll);

// Protected: CREATE, UPDATE, DELETE
router.post('/', auth, create);
router.put('/:id', auth, update);
router.delete('/:id', auth, deleteActivity);

module.exports = router;