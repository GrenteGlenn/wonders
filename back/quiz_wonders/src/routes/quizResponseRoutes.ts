import QuizResponseController from '../controllers/QuizResponseController';
import { RequestHandler, Router } from 'express';

interface Body {
  quiz_id: number;
  user_id: number;
}

const router = Router();

const quizResponseController = new QuizResponseController();

router.get('/quiz-response', (async (req, res) => {
  const quizResponses = await quizResponseController.list();
  res.json(quizResponses);
}) as RequestHandler);

router.get('/quiz-response/:id', (async (req, res) => {
  const quizResponses = await quizResponseController.one(parseInt(req.params.id, 10));
  res.json(quizResponses);
}) as RequestHandler);

router.post('/quiz-response', (async (req, res) => {
  const body = <Body>req.body;
  const quizResponses = await quizResponseController.new(body.quiz_id, body.user_id);
  res.json(quizResponses);
}) as RequestHandler);

router.put('/quiz-response/:id', (async (req, res) => {
  const body = <Body>req.body;
  const quizResponses = await quizResponseController.update(parseInt(req.params.id, 10), body.quiz_id, body.user_id);
  res.json(quizResponses);
}) as RequestHandler);

router.delete('/quiz-response/:id', (async (req, res) => {
  const quizResponses = await quizResponseController.delete(parseInt(req.params.id, 10));
  res.json(quizResponses);
}) as RequestHandler);

export default router;
