import express from 'express';
import 'dotenv/config';
import hotelRoute from './routes/hotelRoute';
import flyRoute from './routes/flyRoute';
import cors from 'cors';

const app = express();
app.use(express.json());

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

app.use('/api/hotel', hotelRoute);
app.use('/api/fly', flyRoute);

app.get('/', function (req, res) {
  res.send('Hello World! Fly Hotel Wonders');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
