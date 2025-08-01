import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
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
import tripRoutes from './routes/tripRoutes';
import tripCityRoutes from './routes/tripCityRoutes';
import tripDayRoutes from './routes/tripDayRoutes';
import tripHotelRoutes from './routes/tripHotelRoutes';
import tripDayActivityRoutes from './routes/tripDayActivityRoutes';
import tripTransportationRoutes from './routes/tripTransportationRoutes';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 3009;

app.use(express.json());

const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

// Routes
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

app.use('/api/trip-transportation', tripTransportationRoutes);
app.use('/api/trip', tripRoutes);
app.use('/api/trip-city', tripCityRoutes);
app.use('/api/trip-day', tripDayRoutes);
app.use('/api/trip-day-activity', tripDayActivityRoutes);
app.use('/api/trip-hotel', tripHotelRoutes);

// Route par défaut
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World! Quiz Wonders');
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
