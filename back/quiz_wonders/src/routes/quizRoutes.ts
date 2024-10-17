import { RequestHandler, Router } from 'express';
import QuizController from '../controllers/QuizController';

interface Body {
  name: string;
  tag_id: number;
}

const router = Router();

const quizController = new QuizController();

router.get('/', (async (req, res) => {
  try {
    const quiz = await quizController.list();
    res.json(quiz);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

router.get('/infos', (async (req, res) => {
  try {
    const quiz = await quizController.listWithInfos();
    res.json(quiz);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

router.get('/infos/:id', (async (req, res) => {
  try {
    const quiz = await quizController.oneWithInfos(parseInt(req.params.id, 10));
    res.json(quiz);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

router.get('/user/:id', (async (req, res) => {
  try {
    const quiz = await quizController.getQuizWithQuestions(parseInt(req.params.id, 10));
    res.json(quiz);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

router.get('/:id', (async (req, res) => {
  try {
    const quiz = await quizController.one(parseInt(req.params.id, 10));
    res.json(quiz);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

router.post('/', (async (req, res) => {
  try {
    const body = <Body>req.body;
    const quiz = await quizController.new(body.name, body.tag_id, new Date(), new Date());
    res.json(quiz);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

router.put('/:id', (async (req, res) => {
  try {
    const body = <Body>req.body;
    const quiz = await quizController.update(
      parseInt(req.params.id, 10),
      body.name,
      body.tag_id,
      new Date(),
      new Date()
    );
    res.json(quiz);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

router.delete('/:id', (async (req, res) => {
  try {
    const quiz = await quizController.remove(parseInt(req.params.id, 10));
    res.json(quiz);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

export default router;
