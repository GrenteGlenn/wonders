import { RequestHandler, Router } from 'express';
import StatusController from '../controllers/StatusController';

interface Body {
  name: string;
}

const router = Router();

const statusController = new StatusController();

router.get('/', (async (req, res) => {
  try {
    const status = await statusController.list();
    res.json(status);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

router.get('/:id', (async (req, res) => {
  try {
    const status = await statusController.one(parseInt(req.params.id, 10));
    res.json(status);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

router.post('/', (async (req, res) => {
  try {
    const body = <Body>req.body;
    const status = await statusController.new(body.name, new Date(), new Date());
    res.json(status);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

router.put('/:id', (async (req, res) => {
  try {
    const body = <Body>req.body;
    const status = await statusController.update(parseInt(req.params.id, 10), body.name);
    res.json(status);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

router.delete('/:id', (async (req, res) => {
  try {
    const status = await statusController.remove(parseInt(req.params.id, 10));
    res.json(status);
  } catch (error) {
    res.json({ error: error });
  }
}) as RequestHandler);

export default router;
