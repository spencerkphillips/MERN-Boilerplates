const jwt = require('jsonwebtoken');
const sendgridMail = require('@sendgrid/mail');
const User = require('../models/user.model.js');

sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);

/**
 * Register
 * * Use the Register API to collect submitted user information and encode a user token. Then email that token to the user for activation.
 * @param {*} req 
 * @param {*} res 
 */
exports.Register = (req, res) => {
  const {
    name,
    email,
    password
  } = req.body;

  User.findOne({
    email
  }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: 'Email is already in use by another account holder.'
      });
    }

    const token = jwt.sign({
      name,
      email,
      password
    }, process.env.JWT_ACCOUNT_ACTIVATION, {
      expiresIn: '24h'
    });

    const emailData = {
      from: process.env.SENDGRID_ADMIN_EMAIL,
      to: email,
      subject: `Account activation link`,
      html: `
      <p>Please use the following link to activate your account.</p>
      <p><a href="http://${process.env.APP_URI}/a/activate/${token}">Activate Here</a></p>
      <p>This activation link expires in 24 hours.</p>
      <hr />
      <p>This email contains account sensetive credentials.</p>
      `
    }

    sendgridMail.send(emailData)
      .then(sent => {
        console.log('Registration email sent.')
        return res.json({
          message: `Email has been sent to: ${email}.`
        })
      }).catch(err => {
        console.error('Registration activation email error.', err);
        return res.json({
          message: err.message
        })
      });
  });
};

/**
 * Activation
 * * Uses the email sent through Register() to grab the user token and decode into a user account.
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.Activation = (req, res) => {
  const {
    token
  } = req.body;

  if (token) {
    jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, function (err, decoded) {
      if (err) {
        console.error('JWT Verify in account activation error.', err);
        return res.status(401), json({
          error: 'Expired Link. Register again!'
        });
      }

      const {
        name,
        email,
        password
      } = jwt.decode(token);

      const user = new User({
        name,
        email,
        password
      });

      user.save((err, user) => {
        if (err) {
          console.error('User creation after account activation error.', err);

          return res.status(401).json({
            error: 'Error creating user after account activation.'
          });
        }

        return res.json({
          message: 'Registration success. Please log in.'
        });
      });
    });

  } else {
    return res.json({
      message: 'Something went wrong, please try again later.'
    });
  }
}

exports.Login = (req, res) => {
  const {
    email,
    password
  } = req.body;

  // Check if user exists
  User.findOne({
    email
  }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User with that email does not exist. Please register.'
      });
    }

    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: 'Email and password do not match!'
      });
    }

    const token = jwt.sign({
      _id: user._id
    }, process.env.JWT_SECRET, {
      expiresIn: '30d'
    });

    const {
      _id,
      name,
      email,
      role
    } = user;

    return res.json({
      token,
      user: {
        _id,
        name,
        email,
        role
      }
    })
  });
}