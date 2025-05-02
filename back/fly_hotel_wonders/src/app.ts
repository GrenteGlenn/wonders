import express from 'express';
import 'dotenv/config';
import hotelRoute from './routes/hotelRoute';
import flyRoute from './routes/flyRoute';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT;

app.use('/api/hotel', hotelRoute);
app.use('/api/fly', flyRoute);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
