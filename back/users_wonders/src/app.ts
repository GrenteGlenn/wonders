import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import addressRoutes from './routes/adressRoutes';
import roleRoutes from './routes/roleRoutes';
import sessionRoutes from './routes/sessionRoutes';
import cors from 'cors';

const app: Express = express();
const jsonParser = bodyParser.json();
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

const port = process.env.DB_PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/api/auth', jsonParser, authRoutes);
app.use('/api/users', jsonParser, userRoutes);
app.use('/api/address', jsonParser, addressRoutes);
app.use('/api/role', jsonParser, roleRoutes);
app.use('/api/session', jsonParser, sessionRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
