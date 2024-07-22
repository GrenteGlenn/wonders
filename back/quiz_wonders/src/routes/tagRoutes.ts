import { RequestHandler, Router } from 'express';
import TagController from '../controllers/TagController';

const router = Router();

const tagController = new TagController();

interface RequestBody {
  name: string;
}

router.get('/tags', (async (req, res) => {
  const tags = await tagController.list();
  res.json(tags);
}) as RequestHandler);

router.get('/tags/:id', (async (req, res) => {
  const tag = await tagController.one(parseInt(req.params.id, 10));
  res.json(tag);
}) as RequestHandler);

router.post('/tags', (async (req, res) => {
  const body = <RequestBody>req.body;
  const tag = await tagController.new(body.name);
  res.json(tag);
}) as RequestHandler);

router.put('/tags/:id', (async (req, res) => {
  const body = <RequestBody>req.body;
  const tag = await tagController.update(parseInt(req.params.id, 10), body.name);
  res.json(tag);
}) as RequestHandler);

router.delete('/tags/:id', (async (req, res) => {
  const tag = await tagController.remove(parseInt(req.params.id, 10));
  res.json(tag);
}) as RequestHandler);

export default router;
