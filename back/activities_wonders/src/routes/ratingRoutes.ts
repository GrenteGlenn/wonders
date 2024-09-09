import { RequestHandler, Router } from 'express';
import RatingController from '../controllers/ratingController';

const router = Router();

const ratingController = new RatingController()

router.get('/rating', async (req, res) => {
    const rating = await ratingController.list()
    res.json(rating)
})

router.get('/rating/:id', async (req, res) => {
    const rating = await ratingController.one(parseInt(req.params.id, 10))
    res.json(rating)
});

router.post('/rating', async (req, res) => {
    const rating = await ratingController.new({ rating: req.body.rating });
    res.json(rating);
});

router.put('/rating/:id', async (req, res) => {
    const rating = await ratingController.update(parseInt(req.params.id, 10), req.body.path)
    res.json(rating)
})

router.delete('/rating/:id', async (req, res) => {
    const rating = await ratingController.delete(parseInt(req.params.id, 10))
    res.json(rating)
})

export default router;