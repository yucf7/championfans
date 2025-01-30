const router = require('express').Router();
const messageController = require('../controllers/message.controller');

router.post('/', messageController.create);
router.get('/', messageController.getAll);

module.exports = router;