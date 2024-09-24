import { RequestHandler, Router } from 'express';
import QuizAnswerTextController from '../controllers/QuizAnswerTextController';

interface Body {
  answer: string;
  quiz_line_id: number;
}

const router = Router();

const quizAnswerTextController = new QuizAnswerTextController();

router.get('/', (async (req, res) => {
  try {
    const quizAnswerTexts = await quizAnswerTextController.list();
    res.json(quizAnswerTexts);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

router.get('/:id', (async (req, res) => {
  try {
    const quizAnswerTexts = await quizAnswerTextController.one(parseInt(req.params.id, 10));
    res.json(quizAnswerTexts);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

router.post('/', (async (req, res) => {
  try {
    const body = <Body>req.body;
    const quizAnswerTexts = await quizAnswerTextController.new(body.answer, body.quiz_line_id, new Date(), new Date());
    res.json(quizAnswerTexts);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

router.put('/:id', (async (req, res) => {
  try {
    const body = <Body>req.body;
    const quizAnswerTexts = await quizAnswerTextController.update(
      parseInt(req.params.id, 10),
      body.answer,
      body.quiz_line_id,
      new Date(),
      new Date()
    );
    res.json(quizAnswerTexts);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

router.delete('/:id', (async (req, res) => {
  try {
    const quizAnswerTexts = await quizAnswerTextController.delete(parseInt(req.params.id, 10));
    res.json(quizAnswerTexts);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

export default router;
