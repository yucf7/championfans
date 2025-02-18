const router = require('express').Router();
const userController = require('../controllers/user.controller');

router.post('/', userController.create);
router.get('/', userController.getAll);


module.exports = router;