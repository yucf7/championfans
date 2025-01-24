const router = require('express').Router();
const userRouter = require('./user.router');
const messageRouter = require('./message.router');

router.use('/users', userRouter);
router.use('/messages', messageRouter);
module.exports = router;