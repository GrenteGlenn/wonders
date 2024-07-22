import { RequestHandler, Router } from 'express';
import QuizController from '../controllers/QuizController';

const router = Router();

const quizController = new QuizController();

interface RequestBody {
  name: string;
}

router.get('/quiz', (async (req, res) => {
  const quiz = await quizController.list();
  res.json(quiz);
}) as RequestHandler);

router.get('/quiz-user/:id', (async (req, res) => {
  const quiz = await quizController.getQuizWithQuestions(parseInt(req.params.id, 10));
  res.json(quiz);
}) as RequestHandler);

router.get('/quiz/:id', (async (req, res) => {
  const quiz = await quizController.one(parseInt(req.params.id, 10));
  res.json(quiz);
}) as RequestHandler);

router.post('/quiz', (async (req, res) => {
  const body = <RequestBody>req.body;
  const quiz = await quizController.new(body.name);
  res.json(quiz);
}) as RequestHandler);

router.put('/quiz/:id', (async (req, res) => {
  const body = <RequestBody>req.body;
  const quiz = await quizController.update(parseInt(req.params.id, 10), body.name);
  res.json(quiz);
}) as RequestHandler);

router.delete('/quiz/:id', (async (req, res) => {
  const quiz = await quizController.remove(parseInt(req.params.id, 10));
  res.json(quiz);
}) as RequestHandler);

export default router;
