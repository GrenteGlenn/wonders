import { RequestHandler, Router } from 'express';
import UserAnswerController from '../controllers/UserAnswerController';
import UserAnswer from '../interfaces/UserAnswerInterface';

const router = Router();
const userAnswerController = new UserAnswerController();

router.get('/', (async (req, res) => {
  const userAnswers = await userAnswerController.list();
  res.json(userAnswers);
}) as RequestHandler);

router.get('/:id', (async (req, res) => {
  const userAnswers = await userAnswerController.one(parseInt(req.params.id, 10));
  res.json(userAnswers);
}) as RequestHandler);

router.post('/', (async (req, res) => {
  const body = <UserAnswer>req.body;
  try {
    const userAnswer = await userAnswerController.new(
      body.quiz_answer_text_id,
      body.quiz_line_id,
      body.quiz_response_id,
      body.boolean,
      body.text,
      new Date(),
      new Date()
    );
    res.json(userAnswer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user answer' });
  }
}) as RequestHandler);

router.put('/:id', (async (req, res) => {
  const body = <UserAnswer>req.body;
  try {
    const userAnswer = await userAnswerController.update(
      parseInt(req.params.id, 10),
      body.quiz_answer_text_id,
      body.quiz_line_id,
      body.quiz_response_id,
      body.boolean,
      body.text
    );
    res.json(userAnswer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user answer' });
  }
}) as RequestHandler);

router.delete('/:id', (async (req, res) => {
  const userAnswer = await userAnswerController.delete(parseInt(req.params.id, 10));
  res.json(userAnswer);
}) as RequestHandler);

export default router;
