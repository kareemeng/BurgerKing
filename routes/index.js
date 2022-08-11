var express = require('express');
const { requireAuth, checkUser } = require('../middleware/authMiddleware');
var indexController = require('../controllers/index');
var router = express.Router();

/* GET home page. */
router.get('/', indexController.get_home);

router.get('/about', indexController.get_about);

router.get('/blog', indexController.get_blog);

router.get('/booking', requireAuth, indexController.get_booking);

router.get('/contact', indexController.get_contact);

router.get('/feature', indexController.get_feature);

router.get('/menu', indexController.get_menu);

router.get('/single', indexController.get_single);

router.get('/team', indexController.get_team);

module.exports = router;