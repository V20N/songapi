const express = require('express');
const { getAllsongs, getsongById, addsongs, updatesongs, deletesongs } = require('../controllers');
const songValidation = require('../middleware/validation/song-validation');
const authorization = require('../middleware/auth');

const router = express.Router();

router.get('/song', authorization, getAllsongs);
router.get('/song/:id', authorization, getsongById);
router.post('/song', songValidation, addsongs);
router.put('/song/:id', songValidation, updatesongs); 
router.delete('/song/:id', authorization, deletesongs); 

module.exports = router;