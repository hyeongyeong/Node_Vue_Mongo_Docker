const router = require('express').Router();
const category = require('./category');
const video = require('./video');

router.use('/category', category);
router.use('/video', video);
