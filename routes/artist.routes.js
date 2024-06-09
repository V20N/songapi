const express = require('express');

const { getAllartists, register } = require('../controllers')

const router = express.Router()

router.get('/artist', getAllartists)
router.post('/artists', register)

module.exports = router