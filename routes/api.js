const router = require('express').Router();
const userRouter = require('./user.router');
const messageRouter = require('./message.router');
const articleRouter = require('./article.router');
const mediaRouter = require('./media.router');

router.use('/users', userRouter);
router.use('/messages', messageRouter);
router.use('/articles', articleRouter);
router.use('/media', mediaRouter);

module.exports = router;