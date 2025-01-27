import { RequestHandler, Router } from 'express';
import UserAnswerController from '../controllers/UserAnswerController';
import UserAnswer from '../interfaces/UserAnswerInterface';
interface UpdatedFields {
  quiz_answer_text_id?: number;
  quiz_line_id: number;
  quiz_response_id: number;
  boolean?: boolean;
  text?: string;
  updated_at: Date;
}

const router = Router();
const userAnswerController = new UserAnswerController();

router.get('/', (async (req, res) => {
  try {
    const userAnswers = await userAnswerController.list();
    res.status(200).json(userAnswers);
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

router.get('/:id', (async (req, res) => {
  try {
    const userAnswers = await userAnswerController.one(parseInt(req.params.id, 10));
    userAnswers
      ? res.status(200).json(userAnswers)
      : res.status(404).json({ code: '404', message: 'entry does not exists' });
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
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
    userAnswer
      ? res.status(201).json(userAnswer)
      : res.status(400).json({ code: '400', message: 'an error occured while creating resource' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user answer' });
  }
}) as RequestHandler);

/* eslint-disable */
router.patch('/:id', (async (req, res) => {
  const body = req.body;
  try {

    const updatedFields: UpdatedFields = {
      quiz_answer_text_id: body.quiz_answer_text_id,
      quiz_line_id: body.quiz_line_id,
      quiz_response_id: body.quiz_response_id,
      boolean: body.boolean,
      text: body.text,
      updated_at: new Date()
    };

    // Supprimer les champs undefined
    Object.keys(updatedFields).forEach((key) => {
      if (updatedFields[key as keyof UpdatedFields] === undefined) {
        delete updatedFields[key as keyof UpdatedFields];
      }
    });

    // Appeler le contrôleur pour mettre à jour l'utilisateur
    const userAnswer = await userAnswerController.update(parseInt(req.params.id, 10), updatedFields);

    if (userAnswer) {
      res.status(200).json(userAnswer); // Réponse avec les données mises à jour
    } else {
      res.status(404).json({ code: '404', message: 'Entry does not exist' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user answer' });
  }
}) as RequestHandler);
/* eslint-enable */
router.delete('/:id', (async (req, res) => {
  try {
    const userAnswer = await userAnswerController.delete(parseInt(req.params.id, 10));
    if (userAnswer) {
      res.status(204);
    } else {
      res.status(404).json({ code: '404', message: 'entry does not exists' });
    }
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

export default router;
