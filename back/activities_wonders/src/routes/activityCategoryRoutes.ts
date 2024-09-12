import { RequestHandler, Router } from 'express';
import ActivityCategoryController from '../controllers/activityCategoryController';

const router = Router();

const activityCategoryController = new ActivityCategoryController();

interface Body {
  name: string;
  picture_id: number;
}

router.get('/activity-category', (async (req, res) => {
  const activityCategory = await activityCategoryController.list();
  res.json(activityCategory);
}) as RequestHandler);

router.get('/activity-category/:id', (async (req, res) => {
  const activityCategory = await activityCategoryController.one(parseInt(req.params.id, 10));
  res.json(activityCategory);
}) as RequestHandler);

router.post('/activity-category', (async (req, res) => {
  const body = <Body>req.body;
  const activityCategory = await activityCategoryController.new({
    name: body.name,
    picture_id: body.picture_id
  });
  res.json(activityCategory);
}) as RequestHandler);

router.put('/activity-category/:id', (async (req, res) => {
  const body = <Body>req.body;
  const activityCategory = await activityCategoryController.update(
    parseInt(req.params.id, 10),
    body.name,
    body.picture_id
  );
  res.json(activityCategory);
}) as RequestHandler);

router.delete('/activity-category/:id', (async (req, res) => {
  const activityCategory = await activityCategoryController.delete(parseInt(req.params.id, 10));
  res.json(activityCategory);
}) as RequestHandler);

export default router;
