import { RequestHandler, Router } from 'express';
import ActivityApiController from '../controllers/activityApiController';

interface Google {
  latitude: number;
  longitude: number;
  radius: number;
  language: string;
  activity: string;
  max: number;
}

const router = Router();

const activityController = new ActivityApiController();

router.get('/', ((req, res) => {
  try {
    const activity = activityController.list();
    res.json(activity);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

router.post('/get_activity', (async (req, res) => {
  const body = <Google>req.body;
  const location = `${body.longitude}%2C${body.latitude}`;
  try {
    const activity = await activityController.get_activity(
      location,
      body.radius,
      body.language,
      body.activity,
      body.max
    );
    console.log(activity);
    res.json(activity);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

// router.post('/get_activity_fake', (async (req, res) => {
// const body = <Google>req.body;
// const location = `${body.longitude}2C${body.latitude}`;
// try {
//   const activity = await activityController.google(location, body.radius, body.language);
//   res.json(activity);
// } catch (error) {
//   res.json({ error: error });
// }
// }) as RequestHandler);

export default router;
