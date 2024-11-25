import { RequestHandler, Router } from 'express';

import QuizLineController from '../controllers/QuizLineController';
import QuizLineInterface from '../interfaces/QuizLineInterface';

const router = Router();

const quizLineController = new QuizLineController();

router.get('/', (async (req, res) => {
  try {

  } catch(error) {
    res.status(500).json({ 'code': '500','message': error });
  }
  const quizLine = await quizLineController.list();
  res.json(quizLine);
}) as RequestHandler);

router.get('/:id', (async (req, res) => {
  try {
    const quizLine = await quizLineController.one(parseInt(req.params.id, 10));
    res.json(quizLine);
  } catch (error) {
    res.status(500).json({ 'code': '500','message': error });
  }
}) as RequestHandler);

router.post('/', (async (req, res) => {
  const body = <QuizLineInterface>req.body;
  try {
    const quizLine = await quizLineController.new({
      quiz_id: body.quiz_id,
      question: body.question,
      is_required: body.is_required,
      is_text: body.is_text,
      mutiple_type_answer: body.mutiple_type_answer,
      parent: body.parent,
      is_boolean: body.is_boolean,
      response_kind_id: body.response_kind_id,
      step: body.step
    });
    quizLine ? res.status(201).json(quizLine) : res.status(400).json({'code': '400', 'message': 'an error occured while creating resource'}) 
  } catch (error) {
    res.status(500).json({ 'code': '500','message': error });
  }
}) as RequestHandler);

router.put('/:id', (async (req, res) => {
  const body = <QuizLineInterface>req.body;
  try {
    const quizLine = await quizLineController.update(
      parseInt(req.params.id, 10),
      body.quiz_id,
      body.question,
      body.is_required,
      body.is_text,
      body.is_boolean,
      body.mutiple_type_answer,
      body.parent,
      body.response_kind_id,
      body.step
    );
    quizLine ? res.status(200).json(quizLine) : res.status(404).json({'code': '404', "message": 'entry does not exists'});
  } catch (error) {
    res.status(500).json({ 'code': '500','message': error });
  }
}) as RequestHandler);

router.delete('/:id', (async (req, res) => {
  try {
    const quizLine = await quizLineController.remove(parseInt(req.params.id, 10));
    quizLine ? res.status(204).json(quizLine) : res.status(404).json({'code': '404', "message": 'entry does not exists'});
    
  } catch (error) {
    res.status(500).json({ 'code': '500','message': error });
  }
}) as RequestHandler);

export default router;
