import express, { Express, Request, RequestHandler, Response } from 'express';
import bodyParser from 'body-parser';
import CustomLogger from '../lib/logger';
import morganMiddleware from '../config/morganMiddleware';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

const PORT = process.env.PORT || 3000;

const app: Express = express();

// Configuration du middleware de limitation de débit
const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  limit: 60, // Limite chaque IP à 60 requêtes par fenêtre de 1 minute
  message: 'Too many requests from this IP, please try again after a minute',
  legacyHeaders: true // Enable the X-Rate-Limit header.
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morganMiddleware);

// Step 1 Parameter validation

// // Step 2 allow-list/deny-list checks
// const allowList = ['123.456.789.000', '111.222.333.444']
// const denyList = ['123.456.789.000', '111.222.333.444']
//
// // Middleware de vérification de la liste blanche
// const accessControlMiddleware = (req, res, next) => {
//   const clientIp = req.ip
//
//   if (denyList.includes(clientIp)) {
//     res.status(403).send('Access denied')
//   } else if (allowList.includes(clientIp)) {
//     next()
//   } else {
//     res.status(403).send('Access denied')
//   }
// }
//
// // Appliquer le middleware de liste blanche à toutes les routes
// app.use(accessControlMiddleware)

// Step 3 authentication and authorization

// Step 4 Rate Limit
// Applique le middleware de limitation à toutes les routes
app.use(limiter);

// Test pour le Logger
app.get('/', (req: Request, res: Response) => {
  CustomLogger.error('This is an error log');
  CustomLogger.warn('This is a warn log');
  CustomLogger.info('This is a info log');
  CustomLogger.http('This is a http log');
  CustomLogger.debug('This is a debug log');

  res.json({ message: 'Hello World!' });
});

// Définir les routes
app.get('/api/service1', (async (req: Request, res: Response) => {
  CustomLogger.info('Service1 use');
  // Step 5 Dynamic Routing and Service Discovery

  const service1Url = process.env.SERVICE1_URL || 'http://localhost:3001';
  const response = await fetch(`${service1Url}/api/service1`);
  const data = await response.json();
  CustomLogger.http('Call Service1 OK!');

  // Step 6 Protocol Conversion
  CustomLogger.info('User response send');
  res.json({ message: 'Hello from Service 1', data: data });
}) as RequestHandler);

app.get('/api/service2', (req: Request, res: Response) => {
  CustomLogger.info('Service2 use');
  res.json({ message: 'Hello from Service 2' });
});

app.listen(PORT, () => {
  console.log('Server is running at http://localhost:8080');
});
