import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';
import countryRoutes from './routes/countryRoutes';
import cityRoutes from './routes/cityRoutes';
import languageRoutes from './routes/languageRoutes';
import cors from 'cors';

const app: Express = express();
const jsonParser = bodyParser.json();
// app.use(express.json());

app.use(cors());

const port = process.env.PORT;

app.use(cors());

app.use('/api/countries', jsonParser, countryRoutes);
app.use('/api/cities', jsonParser, cityRoutes);
app.use('/api/languages', jsonParser, languageRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World! This is Quiz Wonders micro service');
});

app.get('/test', function (req: Request, res: Response) {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
