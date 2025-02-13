import 'dotenv/config';
import express from 'express';

import pictureRoutes from './routes/picturesRoutes';
import activityCategoryRoutes from './routes/activityCategoryRoutes';
import activityRoutes from './routes/activityRoutes';
import ratingRoutes from './routes/ratingRoutes';
import reviewRoutes from './routes/reviewRoutes';
import activityApiRoute from './routes/activityApiRoute';
import cors from 'cors';

const app = express();

const port = process.env.PORT;
app.use(express.json());

app.use(cors());

// Routes

app.use(cors())

app.use('/api/picture', pictureRoutes);
app.use('/api/activity-category', activityCategoryRoutes);
app.use('/api/activity', activityRoutes);
app.use('/api/rating', ratingRoutes);
app.use('/api/review', reviewRoutes);
app.use('/api/activityApi', activityApiRoute);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
