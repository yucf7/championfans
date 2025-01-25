const router = require('express').Router();
const userController = require('../controllers/user.controller');
const adminLimiter = require('../middlewares/rate-limiter.mid');

router.post('/', userController.create);
router.post('/admin', adminLimiter, userController.createAdmin);
router.post('/admin-login', userController.adminLogin);

module.exports = router;