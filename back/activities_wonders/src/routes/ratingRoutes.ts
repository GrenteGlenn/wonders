import { RequestHandler, Router } from 'express';
import RatingController from '../controllers/ratingController';

interface Body {
  rating: number;
  path: number;
}

const router = Router();

const ratingController = new RatingController();

router.get('/', (async (_, res) => {
  const rating = await ratingController.list();
  res.json(rating);
}) as RequestHandler);

router.get('/:id', (async (req, res) => {
  const rating = await ratingController.one(parseInt(req.params.id, 10));
  res.json(rating);
}) as RequestHandler);

router.post('/', (async (req, res) => {
  const body = <Body>req.body;
  const rating = await ratingController.new({ rating: body.rating });
  res.json(rating);
}) as RequestHandler);

router.put('/:id', (async (req, res) => {
  const body = <Body>req.body;
  const rating = await ratingController.update(parseInt(req.params.id, 10), body.rating);
  res.json(rating);
}) as RequestHandler);

router.delete('/:id', (async (req, res) => {
  const rating = await ratingController.delete(parseInt(req.params.id, 10));
  res.json(rating);
}) as RequestHandler);

export default router;
