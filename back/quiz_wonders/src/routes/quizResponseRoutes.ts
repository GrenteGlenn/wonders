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
    res.status(200).json(quizResponses);
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

router.get('/:id', (async (req, res) => {
  try {
    const quizResponses = await quizResponseController.one(parseInt(req.params.id, 10));
    quizResponses
      ? res.status(200).json(quizResponses)
      : res.status(404).json({ code: '404', message: 'entry does not exists' });
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

router.post('/submit-full-asnwer', (async (req, res) => {

  try {
    const response = await quizResponseController.newFullQuizResponse(req.body.quizResponse, req.body.userAnswers)
    res.status(201).json(response)
  } catch (error: unknown) {
    console.error(error)
  }

}))

router.post('/', (async (req, res) => {
  try {
    const body = <Body>req.body;
    const quizResponses = await quizResponseController.new(body.quiz_id, body.user_id, new Date(), new Date());
    quizResponses
      ? res.status(201).json(quizResponses)
      : res.status(400).json({ code: '400', message: 'an error occured while creating resource' });
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

router.put('/:id', (async (req, res) => {
  try {
    const body = <Body>req.body;
    const quizResponses = await quizResponseController.update(
      parseInt(req.params.id, 10),
      body.quiz_id,
      body.user_id,
      new Date()
    );
    quizResponses
      ? res.status(200).json(quizResponses)
      : res.status(404).json({ code: '404', message: 'entry does not exists' });
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

router.delete('/:id', (async (req, res) => {
  try {
    const quizResponses = await quizResponseController.delete(parseInt(req.params.id, 10));
    quizResponses ? res.status(204).json() : res.status(404).json({ code: '404', message: 'entry does not exists' });
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

export default router;
