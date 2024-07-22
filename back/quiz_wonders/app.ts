import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import countryRoutes from './src/routes/countryRoutes';
import statusRoutes from './src/routes/statusRoutes';
import tagRoutes from './src/routes/tagRoutes';
import quizRoutes from './src/routes/quizRoutes';
import organizationRoutes from './src/routes/organizationRoutes';
import organizationUrlRoutes from './src/routes/organizationUrlRoutes'
import quizLineRoutes from './src/routes/quizLineRoutes'
import responseKindRoutes from './src/routes/responseKindRoutes';

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
app.use('/api', quizLineRoutes)
app.use('/api/response-kind', responseKindRoutes)


// Route par défaut
app.get('/', async (req: Request, res: Response) => {
  res.json('Hello World!');
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
