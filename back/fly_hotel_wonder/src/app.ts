import express from 'express';
import 'dotenv/config';
import hotelRoute from './routes/hotelRoute';
import flyRoute from './routes/flyRoute';

const app = express();
app.use(express.json());

let port = process.env.PORT;

app.use('/api/hotel', hotelRoute);
app.use('/api/fly', flyRoute);

app.get('/test', function (req, res) {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
