import { RequestHandler, Router } from 'express';
import FlyController from '../controllers/FlyController';

const router = Router();

const flyController = new FlyController();

router.get('/', ((req, res) => {
  try {
    const fly = flyController.list();
    res.json(fly);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

export default router;
