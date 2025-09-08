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
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World! User Wonders');
});

app.use('/api/auth', jsonParser, authRoutes);

app.use('/api/users', [jsonParser, userCheck], userRoutes);
app.use('/api/address', [jsonParser, userCheck], addressRoutes);
app.use('/api/role', [jsonParser, userCheck], roleRoutes);
app.use('/api/session', [jsonParser, userCheck], sessionRoutes);
app.use('/api/user-group', [jsonParser, userCheck], userGroupRoutes);

app.listen(port, () => {
  console.log(`Example app User listening on port ${port}`);
});

export default app;
