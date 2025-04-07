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
app.use(cors());
 app.use(userCheck);

const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/api/auth', jsonParser, authRoutes);
app.use('/api/users', jsonParser, userRoutes);
app.use('/api/address', jsonParser, addressRoutes);
app.use('/api/role', jsonParser, roleRoutes);
app.use('/api/session', jsonParser, sessionRoutes);
app.use('/api/user-group', jsonParser, userGroupRoutes);

app.listen(port, () => {
  console.log(`Example app User listening on port ${port}`);
});

export default app;
