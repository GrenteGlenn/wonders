import { RequestHandler, Router } from 'express';
import UserAnswerController from '../controllers/UserAnswerController';
import UserAnswer from '../interfaces/UserAnswerInterface';

const router = Router();
const userAnswerController = new UserAnswerController();

router.get('/', (async (req, res) => {
  try {
    const userAnswers = await userAnswerController.list();
    res.status(200).json(userAnswers);
  } catch(error) {
    res.status(500).json({ 'code': '500','message': error });
  }

}) as RequestHandler);

router.get('/:id', (async (req, res) => {
  try {
    const userAnswers = await userAnswerController.one(parseInt(req.params.id, 10));
    userAnswers ? res.status(200).json(userAnswers) : res.status(404).json({'code': '404', "message": 'entry does not exists'});
  } catch(error) {
    res.status(500).json({ 'code': '500','message': error });
  }

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
    userAnswer ? res.status(201).json(userAnswer) : res.status(400).json({'code': '400', 'message': 'an error occured while creating resource'});
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
    userAnswer ? res.status(200).json(userAnswer) : res.status(404).json({'code': '404', "message": 'entry does not exists'});
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user answer' });
  }
}) as RequestHandler);

router.delete('/:id', (async (req, res) => {
  try{
  const userAnswer = await userAnswerController.delete(parseInt(req.params.id, 10));
  if(userAnswer) {
    res.status(204);
  } else {
    res.status(404).json({'code': '404', "message": 'entry does not exists'});
  }
} catch (error) {
  res.status(500).json({ 'code': '500','message': error });
}
}) as RequestHandler);

export default router;
