import express from 'express'
import 'dotenv/config'
import countryRoutes from './routes/countryRoutes'
import cityRoutes from './routes/cityRoutes'
const app = express()
app.use(express.json());


let port = process.env.PORT

app.use('/api', countryRoutes);
app.use('/api', cityRoutes);

app.get('/', (req, res) => {
  res.send('Hello World! This is Quiz Wonders micro service')

})

app.get('/test', function(req, res) {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})