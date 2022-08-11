var express = require('express');
const userController = require('../controllers/userController');
var router = express.Router();

/* GET users listing. */
router.post('/book', userController.post_book);
router.get('/create', userController.post_creat);

module.exports = router;