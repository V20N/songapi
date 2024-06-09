const songControllers = require('./song.controller')
const artistControllers = require('./artist.controller')
const authControllers = require('./auth.controller')

module.exports = {
   ...songControllers,
   ...artistControllers,
   ...authControllers,
}