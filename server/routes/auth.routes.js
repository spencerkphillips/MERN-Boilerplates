const express = require('express');

const router = express.Router();

// Import controllers
const {
  Register,
  Login,
  Activation
} = require('../controllers/user.controller.js');

// Import validators
const {
  runValidation
} = require('../validators');
const {
  userRegisterValidator,
  userLoginValidator
} = require('../validators/user.validator.js');


router.post('/Register', userRegisterValidator, runValidation, Register);

router.post('/Activate/', Activation);

router.post('/Login', userLoginValidator, runValidation, Login);


module.exports = router;