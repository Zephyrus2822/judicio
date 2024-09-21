const express = require('express');
const router = express.Router();
const { initiateLogin, fetchDocuments } = require('../controllers/digilockerController');

router.get('/digilocker/login', initiateLogin);
router.get('/digilocker/callback', fetchDocuments);

module.exports = router;
