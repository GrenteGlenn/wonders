import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import topicRoutes from './routes/topicRoutes'

const app: Express = express();
app.use(cors());

const port = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/api/topics', topicRoutes);



app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});


app.listen(port, () => {
  console.log(`Example app User listening on port ${port}`);
});
