import express, { Request, RequestHandler, Response } from 'express';
import dotenv from 'dotenv';
import countryRoutes from './routes/countryRoutes';
import statusRoutes from './routes/statusRoutes';
import tagRoutes from './routes/tagRoutes';
import quizRoutes from './routes/quizRoutes';
import organizationRoutes from './routes/organizationRoutes';
import organizationUrlRoutes from './routes/organizationUrlRoutes';
import quizLineRoutes from './routes/quizLineRoutes';
import responseKindRoutes from './routes/responseKindRoutes';
import quizResponseRoutes from './routes/quizResponseRoutes';
import userAnswerRoutes from './routes/userAnswerRoutes';
import quizAnswerTextRoutes from './routes/quizAnswerTextRoutes';
import { Client, Language, LatLng } from '@googlemaps/google-maps-services-js';
import { apiViator } from './services/Viator';
import { apiOpenTrip } from './services/OpenTripMap';
import activityRoute from './routes/activityRoute';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use('/api/countries', countryRoutes);
app.use('/api/status', statusRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/organization', organizationRoutes);
app.use('/api/organization-url', organizationUrlRoutes);
app.use('/api/quiz-line', quizLineRoutes);
app.use('/api/response-kind', responseKindRoutes);
app.use('/api/user-answer', userAnswerRoutes);
app.use('/api/quiz-response', quizResponseRoutes);
app.use('/api/quiz-answer-text', quizAnswerTextRoutes);
app.use('/api/activity', activityRoute);

// Route par défaut
app.get('/', ((req: Request, res: Response) => {
  res.json('Hello World!');
}) as RequestHandler);

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
