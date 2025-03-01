const express = require('express');
const authController = require('../controllers/auth.controller')
const router = express.Router();
const adminLimiter = require('../middlewares/rate-limiter.mid');

// check if admin
router.post('/check', authController.checkAdmin);
router.post('/admin-login', authController.adminLogin);
router.post('/newadmin', adminLimiter, authController.createAdmin);


module.exports = router;
