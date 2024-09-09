import 'dotenv/config';
import express from 'express';

import pictureRoutes from './routes/picturesRoutes'
import activityCategoryRoutes from './routes/activityCategoryRoutes'
import activityRoutes from './routes/activityRoutes'
import ratingRoutes from './routes/ratingRoutes'
import reviewRoutes from './routes/reviewRoutes'

const app = express();
const prefix = '/api';

const port = process.env.PORT;
app.use(express.json());
// Routes

app.use(prefix, pictureRoutes)
app.use(prefix, activityCategoryRoutes)
app.use(prefix, activityRoutes)
app.use(prefix, ratingRoutes)
app.use(prefix, reviewRoutes)


app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
