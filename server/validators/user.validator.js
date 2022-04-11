const {
  check
} = require('express-validator');

exports.userRegisterValidator = [
  check('name')
  .not()
  .isEmpty()
  .withMessage('Your full name is required.'),
  check('email')
  .isEmail()
  .withMessage('Must be a valid email address.'),
  check('password')
  .isLength({
    min: 6,
    max: 16
  })
  .withMessage('Please use a valid password.')
]