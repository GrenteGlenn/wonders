import { RequestHandler, Router } from 'express';
import TagController from '../controllers/TagController';

interface Body {
  name: string;
}

const router = Router();

const tagController = new TagController();

router.get('/tags', (async (req, res) => {
  try {
    const tags = await tagController.list();
    res.json(tags);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get tags' });
  }
}) as RequestHandler);

router.get('/tags/:id', (async (req, res) => {
  try {
    const tag = await tagController.one(parseInt(req.params.id, 10));
    res.json(tag);
  } catch (error) {
    res.status(500).json({ error: 'Failed to get tag' });
  }
}) as RequestHandler);

router.post('/tags', (async (req, res) => {
  const body = <Body>req.body;
  try {
    const tag = await tagController.new(body.name, new Date(), new Date());
    res.json(tag);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create tag' });
  }
}) as RequestHandler);

router.put('/tags/:id', (async (req, res) => {
  const body = <Body>req.body;
  try {
    const tag = await tagController.update(parseInt(req.params.id, 10), body.name, new Date(), new Date());
    res.json(tag);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update tag' });
  }
}) as RequestHandler);

router.delete('/tags/:id', (async (req, res) => {
  try {
    const tag = await tagController.remove(parseInt(req.params.id, 10));
    res.json(tag);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete tag' });
  }
}) as RequestHandler);

export default router;
