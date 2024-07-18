import { Router } from "express";

import QuizLineController from "../controllers/QuizLineController";

const router = Router();

const quizLineController = new QuizLineController();

router.get('/quizline', async (req, res) => {
    const quizLine = await quizLineController.list()
    res.json(quizLine); 
})

router.get('/quizline/:id', async (req, res) => {
    const quizLine = await quizLineController.one(parseInt(req.params.id, 10));
    res.json(quizLine);
})

router.post('/quizline', async (req, res) =>  {
    const quizLine = await quizLineController.new(req.body.quiz_id, req.body.tag_id, req.body.rank, req.body.question, req.body.is_required, req.body.response_kind_id)
    res.json(quizLine);
})

router.put('/quizline/:id', async (req, res) =>  {
    const quizLine = await quizLineController.update(parseInt(req.params.id, 10), req.body.quiz_id, req.body.tag_id, req.body.rank, req.body.question, req.body.is_required, req.body.response_kind_id)
    res.json(quizLine);
})

router.delete('/quizline/:id', async (req, res) => {
    const quizLine = await quizLineController.remove(parseInt(req.params.id, 10));
    res.json(quizLine);
})

export default router;