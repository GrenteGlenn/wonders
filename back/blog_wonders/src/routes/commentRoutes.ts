import { RequestHandler, Router, Request, Response } from 'express';
import CommentController from '../controllers/CommentController';

interface Body {
  message: string;
  user_id: number;
  subject: number;
}

const router = Router();

const commentController = new CommentController();

router.get('/', (async (req: Request, res: Response) => {
  try {
    const comment = await commentController.list();

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

router.get('/:id', (async (req: Request, res: Response) => {
  try {
    const comment = await commentController.one(parseInt(req.params.id, 10));
    if (!comment) {
      res.status(404).json({ code: '404', message: 'Entry does not exist' });
    } else {
      res.status(200).json(comment);
    }
  } catch (error: unknown) {
    error instanceof Error
      ? res.status(500).json({ code: '500', message: error.message })
      : res.status(500).json({ code: '500', message: 'An unexpected error occurred' });
  }
}) as RequestHandler);

router.post('/', (async (req: Request, res: Response) => {
  try {
    const body = <Body>req.body;
    const comment = await commentController.new(body.message, body.user_id, body.subject, new Date());
    comment
      ? res.status(201).json(comment)
      : res.status(400).json({ code: '400', message: 'an error occured while creating resource' });
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

router.put('/:id', (async (req: Request, res: Response) => {
  try {
    const body = <Body>req.body;
    const comment = await commentController.update(
      parseInt(req.params.id, 10),
      body.message,
      body.user_id,
      body.subject,
      new Date()
    );
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

router.delete('/:id', (async (req: Request, res: Response) => {
  try {
    await commentController.delete(parseInt(req.params.id, 10));
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

export default router;
