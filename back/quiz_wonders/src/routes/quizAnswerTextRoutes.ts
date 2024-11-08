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
    res.status(200).json(quizAnswerTexts);
  } catch (error) {
    res.status(500).json({ 'code': '500','message': error });
  }
}) as RequestHandler);

router.get('/:id', (async (req, res) => {
  try {
    const quizAnswerTexts = await quizAnswerTextController.one(parseInt(req.params.id, 10));
    quizAnswerTexts ? res.status(200).json(quizAnswerTexts) : res.status(404).json({'code': '404', "message": 'entry does not exists'});
  } catch (error) {
    res.status(500).json({ 'code': '500','message': error });
  }
}) as RequestHandler);

router.post('/', (async (req, res) => {
  try {
    const body = <Body>req.body;
    const quizAnswerTexts = await quizAnswerTextController.new(body.answer, body.quiz_line_id, new Date(), new Date());
    quizAnswerTexts ? res.status(201).json(quizAnswerTexts) : res.status(400).json({'code': '400', 'message': 'an error occured while creating resource'});
  } catch (error) {
    res.status(500).json({ 'code': '500','message': error });
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
    quizAnswerTexts ? res.status(200).json(quizAnswerTexts) : res.status(404).json({'code': '404', "message": 'entry does not exists'});
  } catch (error) {
    res.status(500).json({ 'code': '500','message': error });
  }
}) as RequestHandler);

router.delete('/:id', (async (req, res) => {
  try {
    const quizAnswerTexts = await quizAnswerTextController.delete(parseInt(req.params.id, 10));
    if(quizAnswerTexts) {
      res.status(204).json(quizAnswerTexts);
    } else {
      res.status(404).json({'code': '404', "message": 'entry does not exists'});
    }
  } catch (error) {
    res.status(500).json({ 'code': '500','message': error });
  }
}) as RequestHandler);

export default router;
