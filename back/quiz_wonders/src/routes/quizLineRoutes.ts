import { RequestHandler, Router } from 'express';

import QuizLineController from '../controllers/QuizLineController';

const router = Router();

const quizLineController = new QuizLineController();

interface RequestBody {
  quiz_id: number;
  tag_id: number;
  rank: number;
  question: Text;
  is_required: boolean;
  response_kind_id: number;
  is_text: boolean;
}

router.get('/quizline', (async (req, res) => {
  const quizLine = await quizLineController.list();
  res.json(quizLine);
}) as RequestHandler);

router.get('/quizline/:id', (async (req, res) => {
  const quizLine = await quizLineController.one(parseInt(req.params.id, 10));
  res.json(quizLine);
}) as RequestHandler);

router.post('/quizline', (async (req, res) => {
  const body = <RequestBody>req.body;
  const quizLine = await quizLineController.new(
    body.quiz_id,
    body.question,
    body.is_required,
    body.is_text,
    body.tag_id,
    body.response_kind_id
    // body.rank,
  );
  res.json(quizLine);
}) as RequestHandler);

router.put('/quizline/:id', (async (req, res) => {
  const body = <RequestBody>req.body;
  const quizLine = await quizLineController.update(
    parseInt(req.params.id, 10),
    body.quiz_id,
    body.question,
    body.is_required,
    body.is_text,
    body.tag_id,
    body.response_kind_id
    // body.rank,
  );
  res.json(quizLine);
}) as RequestHandler);

router.delete('/quizline/:id', (async (req, res) => {
  const quizLine = await quizLineController.remove(parseInt(req.params.id, 10));
  res.json(quizLine);
}) as RequestHandler);

export default router;
