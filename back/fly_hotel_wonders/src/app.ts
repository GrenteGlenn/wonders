import express from 'express';
import 'dotenv/config';
import hotelRoute from './routes/hotelRoute';
import flyRoute from './routes/flyRoute';
import cors from 'cors';

const app = express();
app.use(express.json());

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    optionsSuccessStatus: 200
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
