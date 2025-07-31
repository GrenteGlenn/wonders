import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import topicRoutes from './routes/topicRoutes';
import subjectRoutes from './routes/subjectRoutes';
import commentRoutes from './routes/commentRoutes';
import userSubjectRouter from './routes/userSubjectRoutes';

const app: Express = express();

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

// app.use(userCheck);
const port = process.env.PORT || 3004;

app.use(express.json());

// Routes
app.use('/api/topics', topicRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/like', userSubjectRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World! Blog Wonder');
});

app.listen(port, () => {
  console.log(`Example app User listening on port ${port}`);
});
