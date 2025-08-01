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

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use('/api/picture', pictureRoutes);
app.use('/api/activity-category', activityCategoryRoutes);
app.use('/api/activity', activityRoutes);
app.use('/api/rating', ratingRoutes);
app.use('/api/review', reviewRoutes);
app.use('/api/activityApi', activityApiRoute);

app.get('/', (req, res) => {
  res.send('Hello World! Activity Wonder');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
