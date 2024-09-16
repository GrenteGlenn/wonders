import { RequestHandler, Router } from 'express';

import QuizLineController from '../controllers/QuizLineController';
import QuizLineInterface from '../interfaces/QuizLineInterface';

const router = Router();

const quizLineController = new QuizLineController();

router.get('/quizline', (async (req, res) => {
  const quizLine = await quizLineController.list();
  res.json(quizLine);
}) as RequestHandler);

router.get('/quizline/:id', (async (req, res) => {
  try {
    const quizLine = await quizLineController.one(parseInt(req.params.id, 10));
    res.json(quizLine);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

router.post('/quizline', (async (req, res) => {
  const body = <QuizLineInterface>req.body;
  try {
    const quizLine = await quizLineController.new({
      quiz_id: body.quiz_id,
      question: body.question,
      is_required: body.is_required,
      is_text: body.is_text,
      is_boolean: body.is_boolean,
      tag_id: body.tag_id,
      response_kind_id: body.response_kind_id,
      step: body.step
    });
    res.json(quizLine);
  } catch (error) {
    res.status(500).json(error);
  }
}) as RequestHandler);

router.put('/quizline/:id', (async (req, res) => {
  const body = <QuizLineInterface>req.body;
  try {
    const quizLine = await quizLineController.update(
      parseInt(req.params.id, 10),
      body.quiz_id,
      body.question,
      body.is_required,
      body.is_text,
      body.is_boolean,
      body.tag_id,
      body.response_kind_id,
      body.step
    );
    res.json(quizLine);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

router.delete('/quizline/:id', (async (req, res) => {
  try {
    const quizLine = await quizLineController.remove(parseInt(req.params.id, 10));
    res.json(quizLine);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

export default router;
