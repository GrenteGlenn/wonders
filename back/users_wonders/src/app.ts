import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import addressRoutes from './routes/adressRoutes';
import roleRoutes from './routes/roleRoutes';
import sessionRoutes from './routes/sessionRoutes';
import userGroupRoutes from './routes/userGroupRoutes';
import cors from 'cors';
import userCheck from './middlewares/userCheck';

const app: Express = express();
const jsonParser = bodyParser.json();

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

const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World! User Wonders');
});

app.use('/api/auth', jsonParser, authRoutes);

app.use(userCheck);

app.use('/api/users', jsonParser, userRoutes);
app.use('/api/address', jsonParser, addressRoutes);
app.use('/api/role', jsonParser, roleRoutes);
app.use('/api/session', jsonParser, sessionRoutes);
app.use('/api/user-group', jsonParser, userGroupRoutes);

app.listen(port, () => {
  console.log(`Example app User listening on port ${port}`);
});

export default app;
