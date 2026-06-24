const express = require('express');
const router = express.Router();
const { getLogs } = require('../controllers/auditLogController');
const auth = require('../middleware/auth');

router.get('/', auth, getLogs);

module.exports = router;