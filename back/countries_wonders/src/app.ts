import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';
import countryRoutes from './routes/countryRoutes';
import cityRoutes from './routes/cityRoutes';
import languageRoutes from './routes/languageRoutes';
import cors from 'cors';
import airportRoutes from './routes/airportRoutes';

const app: Express = express();
const jsonParser = bodyParser.json();

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

const port = process.env.PORT;

app.use('/api/countries', jsonParser, countryRoutes);
app.use('/api/cities', jsonParser, cityRoutes);
app.use('/api/languages', jsonParser, languageRoutes);
app.use('/api/airports', jsonParser, airportRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World! Country Wonders');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
