import { RequestHandler, Router } from 'express';
import ActivityController from '../controllers/ActivityController';

interface Google {
  latitude: number;
  longitude: number;
  radius: number;
  language: string;
}

const router = Router();

const activityController = new ActivityController();

router.get('/', ((req, res) => {
  try {
    const activity = activityController.list();
    res.json(activity);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

router.get('/google', (async (req, res) => {
  const body = <Google>req.body;
  const location = `${body.longitude}2C${body.latitude}`;
  try {
    const activity = await activityController.google(location, body.radius, body.language);
    res.json(activity);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

export default router;
