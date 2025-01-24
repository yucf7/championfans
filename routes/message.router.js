const router = require('express').Router();
const messageController = require('../controllers/message.controller');

router.post('/create', messageController.create);

module.exports = router;