const router = require('express').Router();

router.post('/create', (req, res) => {
    res.json({ info: req.body });
});

module.exports = router;