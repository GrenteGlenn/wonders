import { RequestHandler, Router } from 'express';
import TopicController from '../controllers/TopicController';

interface Body {
  country_id: number;
  name: string;
}

const router = Router();

const topicController = new TopicController();

router.get('/', (async (req, res) => {
  try {
    const topic = await topicController.list();
    console.log(topic);
    
    res.status(200).json(topic);
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

router.get('/:id', (async (req, res) => {
  try {
    const topic = await topicController.one(parseInt(req.params.id, 10));
    if (topic as any) {
      res.status(200).json(topic);
    } else {
      res.status(404).json({ code: '404', message: 'Entry does not exist' });
    }
  } catch (error: unknown) {
    error instanceof Error ?
     res.status(500).json({ code: '500', message: error.message }) :
     res.status(500).json({ code: '500', message: 'An unexpected error occurred'})
  }
}) as RequestHandler);

router.post('/', (async (req, res) => {
  try {
    const body = <Body>req.body;
    const topic = await topicController.new(body.country_id, body.name, new Date());
    topic
      ? res.status(201).json(topic)
      : res.status(400).json({ code: '400', message: 'an error occured while creating resource' });
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

router.put('/:id', (async (req, res) => {
  try {
    const body = <Body>req.body;
    const topic = await topicController.update(
      parseInt(req.params.id, 10),
      body.country_id,
      body.name,
      new Date()
    );
    res.status(200).json(topic);
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

router.delete('/:id', (async (req, res) => {
  try {
    await topicController.delete(parseInt(req.params.id, 10));
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

export default router;