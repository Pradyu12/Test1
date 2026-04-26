const express = require('express');
const router = express.Router();
const authController = require('../controller/authController'); // Matches your 'controller' folder

router.post('/login', authController.login);

module.exports = router;