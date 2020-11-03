/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');

const router = express.Router();

const example = require('./example');

router.use('/example', example);

module.exports = router;
