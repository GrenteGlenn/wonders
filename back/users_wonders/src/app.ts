import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import addressRoutes from './routes/adressRoutes';
import roleRoutes from './routes/roleRoutes';

const app: Express = express();
const jsonParser = bodyParser.json();

const port = process.env.DB_PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/api', jsonParser, authRoutes);
app.use('/api', jsonParser, userRoutes);
app.use('/api', jsonParser, addressRoutes);
app.use('/api', jsonParser, roleRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
