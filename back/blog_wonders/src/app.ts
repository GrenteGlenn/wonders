import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import topicRoutes from './routes/topicRoutes'
import subjectRoutes from './routes/subjectRoutes'
import commentRoutes from './routes/commentRoutes'
import userSubjectRouter from './routes/userSubjectRoutes'
import userCheck from './middlewares/userCheck';

const app: Express = express();
app.use(cors());
// app.use(userCheck);

const port = process.env.PORT || 3004;

app.use(express.json());

// Routes
app.use('/api/topics', topicRoutes);
app.use('/api/subjects', subjectRoutes)
app.use('/api/comments', commentRoutes)
app.use('/api/like', userSubjectRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});


app.listen(port, () => {
  console.log(`Example app User listening on port ${port}`);
});
