import { RequestHandler, Router } from 'express';
import StatusController from '../controllers/StatusController';

interface Body {
  name: string;
}

const router = Router();

const statusController = new StatusController();

router.get('/status', (async (req, res) => {
  const status = await statusController.list();
  res.json(status);
}) as RequestHandler);

router.get('/status/:id', (async (req, res) => {
  const status = await statusController.one(parseInt(req.params.id, 10));
  res.json(status);
}) as RequestHandler);

router.post('/status', (async (req, res) => {
  const body = <Body>req.body;
  const status = await statusController.new(body.name);
  res.json(status);
}) as RequestHandler);

router.put('/status/:id', (async (req, res) => {
  const body = <Body>req.body;
  const status = await statusController.update(parseInt(req.params.id, 10), body.name);
  res.json(status);
}) as RequestHandler);

router.delete('/status/:id', (async (req, res) => {
  const status = await statusController.remove(parseInt(req.params.id, 10));
  res.json(status);
}) as RequestHandler);

export default router;
