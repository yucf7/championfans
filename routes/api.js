const router = require('express').Router();
const userRouter = require('./user.router');
const messageRouter = require('./message.router');
const articleRouter = require('./article.router');
const mediaRouter = require('./media.router');
const authRouter = require('./auth.router');

router.use('/users', userRouter);
router.use('/messages', messageRouter);
router.use('/articles', articleRouter);
router.use('/media', mediaRouter);
router.use('/auth', authRouter);

module.exports = router;