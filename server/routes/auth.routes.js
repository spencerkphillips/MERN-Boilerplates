const express = require('express');

const router = express.Router();

// Import controllers
const {
  Register,
  Activation
} = require('../controllers/user.controller.js');

// Import validators
const {
  runValidation
} = require('../validators');
const {
  userRegisterValidator
} = require('../validators/user.validator.js');


router.post('/Register', userRegisterValidator, runValidation, Register);

router.post('/Activate/', Activation)

module.exports = router;