const path = require('path');
const express = require('express');
const authController = require('../controllers/auth');
const isauth = require('../middleware/is-auth');
const router = express.Router();

router.get('/account', authController.login_get);

router.get('/account', authController.signup_get);

router.post('/login', authController.login_post);

router.post('/signup', authController.signup_post);

router.get('/logout', authController.logout_get);

module.exports = router;