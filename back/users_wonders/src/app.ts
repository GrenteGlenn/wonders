import express, { Request, Response } from 'express';
import 'dotenv/config';

const envP = process.env.DB_PORT;

const app = express();

let port = 3000;
if (envP) port = parseInt(envP);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
