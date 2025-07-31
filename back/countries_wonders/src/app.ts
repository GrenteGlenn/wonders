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
