const express = require('express')

const songRoutes = require('./song.routes')
const artistRoutes = require('./artist.routes')
const authRoutes = require('./auth.routes')

const router = express.Router()

router.use('', songRoutes)
router.use('', artistRoutes)
router.use('', authRoutes)

module.exports = router