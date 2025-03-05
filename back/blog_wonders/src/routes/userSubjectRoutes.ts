import { RequestHandler, Router, Request, Response } from 'express';
import UserSubjectController from '../controllers/UserSubjectController';

interface Body {
  user_id: number;
  subject_id: number;
}

const router = Router();

const userSubjectController = new UserSubjectController();

router.post('/', (async (req: Request, res: Response) => {
  try {
    const body = <Body>req.body;
    const like = await userSubjectController.create(body.user_id, body.subject_id);
    res.status(201).json(like);
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);


router.delete('/:id', (async (req: Request, res: Response) => {
  try {
    await userSubjectController.delete(parseInt(req.params.id, 10));
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

export default router;