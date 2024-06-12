const express = require('express')
const app = express()
let dotenv = require('dotenv').config()

let port = process.env.PORT

app.get('/', (req, res) => {
  res.send('Hello World! This is Quiz Wonders micro service')

})

app.get('/test', function (req, res) {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})