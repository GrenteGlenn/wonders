import { RequestHandler, Router } from 'express';
import ActivityController from '../controllers/activityController';

const router = Router();

const activityController = new ActivityController();

interface Body {
  name: string;
  description: Text;
  is_free: boolean;
  duration: number;
  price: number;
  category_id: number;
  partner: string;
  url: string;
  path: string;
}

router.get('/', (async (req, res) => {
  const activity = await activityController.list();
  res.json(activity);
}) as RequestHandler);

router.get('/:id', (async (req, res) => {
  const activity = await activityController.one(parseInt(req.params.id, 10));
  res.json(activity);
}) as RequestHandler);

router.post('/', (async (req, res) => {
  const body = <Body>req.body;
  const activity = await activityController.new({
    name: body.name,
    description: body.description,
    is_free: body.is_free,
    duration: body.duration,
    price: body.price,
    category_id: body.category_id,
    partner: body.partner,
    url: body.url
  });
  res.json(activity);
}) as RequestHandler);

router.put('/:id', (async (req, res) => {
  const body = <Body>req.body;
  const activity = await activityController.update(
    parseInt(req.params.id, 10),
    body.name,
    body.url,
    body.description,
    body.is_free,
    body.duration,
    body.price,
    body.partner,
    body.category_id
  );

  res.json(activity);
}) as RequestHandler);

router.delete('/:id', (async (req, res) => {
  const activity = await activityController.delete(parseInt(req.params.id, 10));
  res.json(activity);
}) as RequestHandler);

export default router;
