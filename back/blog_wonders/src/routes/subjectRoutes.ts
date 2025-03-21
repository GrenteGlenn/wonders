import { RequestHandler, Router, Request, Response } from 'express';
import SubjectController from '../controllers/SubjectController';

interface Body {
  user_id: number;
  title: string;
  content: string;
  topic: number;
}

const router = Router();

const subjectController = new SubjectController();

router.get('/', (async (req: Request, res: Response) => {
  try {
    const id = Number(req.query.topic_id);
    const subject = await subjectController.list(id);

    res.status(200).json(subject);
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

router.get('/:id', (async (req: Request, res: Response) => {
  try {
    const subject = await subjectController.one(parseInt(req.params.id, 10));
    if (!subject) {
      res.status(404).json({ code: '404', message: 'Entry does not exist' });
    } else {
      res.status(200).json(subject);
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
    const subject = await subjectController.create(body.title, body.content, body.user_id, body.topic, new Date());
    subject
      ? res.status(201).json(subject)
      : res.status(400).json({ code: '400', message: 'an error occured while creating resource' });
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

router.put('/:id', (async (req: Request, res: Response) => {
  try {
    const body = <Body>req.body;
    const subject = await subjectController.update(
      parseInt(req.params.id, 10),
      body.title,
      body.content,
      body.user_id,
      body.topic,
      new Date()
    );
    res.status(200).json(subject);
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

router.delete('/:id', (async (req: Request, res: Response) => {
  try {
    await subjectController.delete(parseInt(req.params.id, 10));
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

export default router;
