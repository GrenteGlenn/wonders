import { RequestHandler, Router } from 'express';
import ActivityController from '../controllers/ActivityController';

const router = Router();

const activityController = new ActivityController();

router.get('/', (async (req, res) => {
  try {
    const activity = activityController.list();
    res.json(activity);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

export default router;
