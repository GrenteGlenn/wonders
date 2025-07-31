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
  origin: function (origin: string | undefined, callback: (error: Error | null, options?: boolean) => void) {
    const allowedOrigins = [
      'https://users.wonders-travel.fr',
      'https://quizz.wonders-travel.fr',
      'https://countries.wonders-travel.fr',
      'https://activities.wonders-travel.fr',
      'https://blog.wonders-travel.fr',
      'https://fly.wonders-travel.fr',
      'https://back-office.wonders-travel.fr',
      'https://web.wonders-travel.fr'
    ];

    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Origin non autorisé'));
    }
  },
  credentials: true
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
