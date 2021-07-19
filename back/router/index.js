const router = require('express').Router();
const category = require('./category');
const video = require('./video');
const file = require('./file');

router.use('/category', category);
router.use('/video', video);
router.use('/file', file);

module.exports = router;