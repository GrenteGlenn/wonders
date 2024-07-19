import express, { Request, Response } from 'express';
import 'dotenv/config';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';

const envP = process.env.DB_PORT;

const app = express();

let port = 3000;
if (envP) port = parseInt(envP);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/api', authRoutes);
app.use('/api', userRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
