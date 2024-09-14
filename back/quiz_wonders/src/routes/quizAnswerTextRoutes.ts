import { RequestHandler, Router } from 'express';
import QuizAnswerTextController from '../controllers/QuizAnswerTextController';

interface Body {
  answer: string;
  quiz_line_id: number;
}

const router = Router();

const quizAnswerTextController = new QuizAnswerTextController();

router.get('/quiz-answer-text', (async (req, res) => {
  const quizAnswerTexts = await quizAnswerTextController.list();
  res.json(quizAnswerTexts);
}) as RequestHandler);

router.get('/quiz-answer-text/:id', (async (req, res) => {
  const quizAnswerTexts = await quizAnswerTextController.one(parseInt(req.params.id, 10));
  res.json(quizAnswerTexts);
}) as RequestHandler);

router.post('/quiz-answer-text', (async (req, res) => {
  const body = <Body>req.body;
  const quizAnswerTexts = await quizAnswerTextController.new(body.answer, body.quiz_line_id, new Date(), new Date());
  res.json(quizAnswerTexts);
}) as RequestHandler);

router.put('/quiz-answer-text/:id', (async (req, res) => {
  const body = <Body>req.body;
  const quizAnswerTexts = await quizAnswerTextController.update(
    parseInt(req.params.id, 10),
    body.answer,
    body.quiz_line_id,
    new Date(), new Date()
  );
  res.json(quizAnswerTexts);
}) as RequestHandler);

router.delete('/quiz-answer-text/:id', (async (req, res) => {
  const quizAnswerTexts = await quizAnswerTextController.delete(parseInt(req.params.id, 10));
  res.json(quizAnswerTexts);
}) as RequestHandler);

export default router;
