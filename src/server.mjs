import Express from 'express'
import ReqResLogger from './ReqResLogger/index.mjs'
import bodyParser from 'body-parser'

const app = new Express()
const router = Express.Router()

app.use(bodyParser.json())
app.use(ReqResLogger)

router.post('/home', function (req, res) {
  const response = {
    statusCode: 200,
    status: 'OK',
    message: 'Home Success'
  }
  res.body = response
  res.send(response)
})

app.use('/', router)

app.listen(8080)
