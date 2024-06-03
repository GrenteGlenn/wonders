const express = require('express')
const app = express()
let dotenv = require('dotenv').config()


app.get('/', (req, res) => {
  res.send('Hello World!')

})

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(dotenv.PORT, () => {
  console.log(`Example app listening on port ${port}`)
})