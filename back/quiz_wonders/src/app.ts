import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import countryRoutes from './routes/countryRoutes';
import statusRoutes from './routes/statusRoutes';
import tagRoutes from './routes/tagRoutes';
import quizRoutes from './routes/quizRoutes';
import organizationRoutes from './routes/organizationRoutes';
import organizationUrlRoutes from './routes/organizationUrlRoutes'
import dbConnection from './config/dbConnection';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/api', countryRoutes);
app.use('/api', statusRoutes);
app.use('/api', tagRoutes);
app.use('/api', quizRoutes);
app.use('/api', organizationRoutes)
app.use('/api', organizationUrlRoutes)


// Route par défaut
app.get('/', async (req: Request, res: Response) => {
  res.json('Hello World!');
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
