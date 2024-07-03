import express = require('express')
import 'dotenv/config'

const app = express()
let dotenv = require('dotenv').config()

let port = process.env.PORT

app.get('/', (req: Request, res: any) => {
  res.send('Hello World!')

})

app.get('/', function (req: Request, res: any) {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})