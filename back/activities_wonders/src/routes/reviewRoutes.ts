import { RequestHandler, Router } from 'express';
import ReviewController from '../controllers/reviewController';

interface Body {
  review: Text;
  user_id: number;
  activity_id: number;
  rating_id: number;
}

const router = Router();

const reviewController = new ReviewController();

router.get('/review', (async (req, res) => {
  const review = await reviewController.list();
  res.json(review);
}) as RequestHandler);

router.get('/review/:id', (async (req, res) => {
  const review = await reviewController.one(parseInt(req.params.id, 10));
  res.json(review);
}) as RequestHandler);

router.post('/review', (async (req, res) => {
  const body = <Body>req.body;
  const review = await reviewController.new({
    comment: body.review,
    user_id: body.user_id,
    activity_id: body.activity_id,
    rating_id: body.rating_id
  });
  res.json(review);
}) as RequestHandler);

router.put('/review/:id', (async (req, res) => {
  const body = <Body>req.body;
  const review = await reviewController.update(
    parseInt(req.params.id, 10),
    body.user_id,
    body.activity_id,
    body.rating_id,
    body.review
  );
  res.json(review);
}) as RequestHandler);

router.delete('/review/:id', (async (req, res) => {
  const review = await reviewController.delete(parseInt(req.params.id, 10));
  res.json(review);
}) as RequestHandler);

export default router;
