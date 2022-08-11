var express = require('express');
var router = express.Router();
var admin = require("../controllers/admin_controller");
const { requireAdmin, requireAuth, checkUser } = require('../middleware/authMiddleware')




router.get('/', requireAdmin, requireAuth, admin.admin);

router.get('/reservation', requireAdmin, requireAuth, admin.reservation);

router.post('/reservation', requireAdmin, requireAuth, checkUser, admin.reservation_post);

router.post('/delete-category', requireAdmin, requireAuth, admin.del_category_post);

router.get('/addcategory', requireAdmin, requireAuth, admin.add_category_get);

router.get('/addproduct', requireAdmin, requireAuth, admin.add_product_get);

router.get('/updatecategory/:id', requireAdmin, requireAuth, admin.update_category_get);
router.get('/updateproduct/:id', requireAdmin, requireAuth, admin.update_product_get);

router.post('/addcategory', requireAdmin, requireAuth, admin.add_category_post);
router.post('/addproduct', requireAdmin, requireAuth, admin.add_product_post);

router.post('/updatecategory', requireAdmin, requireAuth, admin.update_category_post);
router.post('/updateproduct', requireAdmin, requireAuth, admin.update_product_post);

router.post('/delete-product', requireAdmin, requireAuth, admin.del_product_post);
module.exports = router;