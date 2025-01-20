import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import 'dotenv/config';
import cors from 'cors';

const app: Express = express();
const jsonParser = bodyParser.json();
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

const port = process.env.DB_PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});


app.listen(port, () => {
  console.log(`Example app User listening on port ${port}`);
});
