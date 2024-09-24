import QuizResponseController from '../controllers/QuizResponseController';
import { RequestHandler, Router } from 'express';

interface Body {
  quiz_id: number;
  user_id: number;
}

const router = Router();

const quizResponseController = new QuizResponseController();

router.get('/', (async (req, res) => {
  try {
    const quizResponses = await quizResponseController.list();
    res.json(quizResponses);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

router.get('/:id', (async (req, res) => {
  try {
    const quizResponses = await quizResponseController.one(parseInt(req.params.id, 10));
    res.json(quizResponses);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

router.post('/', (async (req, res) => {
  try {
    const body = <Body>req.body;
    const quizResponses = await quizResponseController.new(body.quiz_id, body.user_id, new Date(), new Date());
    res.json(quizResponses);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

router.put('/:id', (async (req, res) => {
  try {
    const body = <Body>req.body;
    const quizResponses = await quizResponseController.update(
      parseInt(req.params.id, 10),
      body.quiz_id,
      body.user_id,
      new Date(),
      new Date()
    );
    res.json(quizResponses);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

router.delete('/:id', (async (req, res) => {
  try {
    const quizResponses = await quizResponseController.delete(parseInt(req.params.id, 10));
    res.json(quizResponses);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

export default router;
