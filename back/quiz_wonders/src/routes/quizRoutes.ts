import { Router } from 'express';
import QuizController from '../controllers/QuizController';

const router = Router();

const quizController = new QuizController();

router.get('/quiz', async (req, res) => {
    const quiz = await quizController.list();
    res.json(quiz);
});

router.get('/quiz-user/:id', async (req, res) => {
    const quiz = await quizController.getQuizWithQuestions(parseInt(req.params.id, 10));
    res.json(quiz);
});

router.get('/quiz/:id', async (req, res) => {
    const quiz = await quizController.one(parseInt(req.params.id, 10));
    res.json(quiz);
});

router.post('/quiz', async (req, res) => {
    const quiz = await quizController.new(req.body.name);
    res.json(quiz);
});

router.put('/quiz/:id', async (req, res) => {
    const quiz = await quizController.update(parseInt(req.params.id, 10), req.body.name);
    res.json(quiz);
});

router.delete('/quiz/:id', async (req, res) => {
    const quiz = await quizController.remove(parseInt(req.params.id, 10));
    res.json(quiz);
});

export default router;

