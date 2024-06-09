const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const router = require('./routers')
const NotFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

const app = express()
const port = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(cookieParser(process.env.SECRET_KEY))
app.use('/api', router)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(NotFoundMiddleware)
app.use(errorHandlerMiddleware)

app.listen(port, () => {
  console.log(`App listening on ${port}`)
})