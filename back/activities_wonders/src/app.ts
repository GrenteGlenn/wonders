import 'dotenv/config';
import express from 'express';

import pictureRoutes from './routes/picturesRoutes'
import activityCategoryRoutes from './routes/activityCategoryRoutes'
const app = express();

const port = process.env.PORT;
app.use(express.json());
// Routes

app.use('/api', pictureRoutes)
app.use('/api', activityCategoryRoutes)


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
