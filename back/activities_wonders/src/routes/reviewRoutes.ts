import { RequestHandler, Router } from 'express';
import ReviewController from '../controllers/reviewController';

const router = Router();

const reviewController = new ReviewController()

router.get('/review', async (req, res) => {
    const review= await reviewController.list()
    res.json(review)
})

router.get('/review/:id', async (req, res) => {
    const review = await reviewController.one(parseInt(req.params.id, 10))
    res.json(review)
});

router.post('/review', async (req, res) => {
    const review = await reviewController.new({ comment: req.body.review, user_id: req.body.user_id, activity_id: req.body.activity_id, rating_id: req.body.rating_id });
    res.json(review);
});

router.put('/review/:id', async (req, res) => {
    const review = await reviewController.update(parseInt(req.params.id, 10),req.body.review, req.body.user_id, req.body.activity_id, req.body.rating_id )
    res.json(review)
})

router.delete('/review/:id', async (req, res) => {
    const review = await reviewController.delete(parseInt(req.params.id, 10))
    res.json(review)
})

export default router;