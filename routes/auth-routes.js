const express = require('express');
const {register, oauthGoogle} = require('../controller/auth/registerController');
const {login} = require('../controller/auth/loginController');
const {logout} = require('../controller/auth/logoutController');
const {forgotPassword} = require('../controller/auth/forgotController');
const router = express.Router();

// Registration route
router.post('/', register);

router.post('/', oauthGoogle);

// Login route
router.post('/', login);

// Logout route
router.post('/', logout);

router.post('/', forgotPassword);

module.exports = router;

module.exports = {
  registerMiddleware : register,
  loginMiddleware : login,
  logoutMiddleware : logout,
  forgotPassword: forgotPassword,
  routes : router
}