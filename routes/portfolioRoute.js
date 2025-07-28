const express = require('express');
const router = express.Router();
const { sendemailcontroller } = require('../controllers/portfolioController');

// Route for sending email
router.post('/sendEmail', sendemailcontroller);

module.exports = router;
