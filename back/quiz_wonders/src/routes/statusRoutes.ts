import { RequestHandler, Router } from 'express';
import StatusController from '../controllers/StatusController';
import { adminCheck } from '../middlewares/adminCheck';

interface Body {
  name: string;
}

const router = Router();

const statusController = new StatusController();

router.get('/', (async (req, res) => {
  try {
    const status = await statusController.list();
    res.status(200).json(status);
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

router.get('/:id', (async (req, res) => {
  try {
    const status = await statusController.one(parseInt(req.params.id, 10));
    status ? res.status(200).json(status) : res.status(404).json({ code: '404', message: 'entry does not exists' });
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

router.post('/', (async (req, res) => {
  try {
    const body = <Body>req.body;
    const status = await statusController.new(body.name, new Date(), new Date());
    status
      ? res.status(201).json(status)
      : res.status(400).json({ code: '400', message: 'an error occured while creating resource' });
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

router.put('/:id', (async (req, res) => {
  try {
    const body = <Body>req.body;
    const status = await statusController.update(parseInt(req.params.id, 10), body.name, new Date());
    status ? res.status(200).json(status) : res.status(404).json({ code: '404', message: 'entry does not exists' });
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

router.delete('/:id', adminCheck, (async (req, res) => {
  try {
    const status = await statusController.remove(parseInt(req.params.id, 10));
    if (status) {
      res.status(204).json();
    } else {
      res.status(404).json({ code: '404', message: 'entry does not exists' });
    }
  } catch (error) {
    res.status(500).json({ code: '500', message: error });
  }
}) as RequestHandler);

export default router;
