import express from 'express'
import 'dotenv/config'

const app = express()


let port = process.env.PORT

app.get('/', (req, res) => {
  res.send('Hello World! This is Quiz Wonders micro service')

})

app.get('/test', function(req, res) {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})