const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getLoans, createLoan, updateLoan, deleteLoan } = require('../controllers/loanController');

// Public: GET semua peminjaman (boleh, tapi bisa juga pakai auth)
router.get('/', getLoans);

// Protected: CREATE, UPDATE, DELETE
router.post('/', auth, createLoan);
router.put('/:id', auth, updateLoan);
router.delete('/:id', auth, deleteLoan);

module.exports = router;