import { RequestHandler, Router } from 'express';
import SessionController from '../controllers/SessionController';
import SessionInterface from '../interfaces/SessionInterface';
import adminCheck from '../middlewares/adminCheck';

const router = Router();

const sessionController = new SessionController();

router.get('/', (async (req, res) => {
  try {
    const sessions = await sessionController.list();
    res.status(200).json(sessions);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}) as RequestHandler);

router.get('/:id', adminCheck, (async (req, res) => {
  try {
    const session = await sessionController.getOne(parseInt(req.params.id, 10));
    res.status(200).json(session);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}) as RequestHandler);

router.get('/user/:id', adminCheck, (async (req, res) => {
  try {
    const session = await sessionController.getByUser(parseInt(req.params.id, 10));
    res.status(200).json(session);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}) as RequestHandler);

router.post('/', (async (req, res) => {
  try {
    const body = <SessionInterface>req.body;
    const session = await sessionController.create(body);
    res.status(200).json(session);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}) as RequestHandler);

router.put('/:id', (async (req, res) => {
  try {
    const body = <SessionInterface>req.body;
    const session = await sessionController.update(parseInt(req.params.id, 10), body);
    res.status(200).json(session);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}) as RequestHandler);

router.delete('/:id', (async (req, res) => {
  try {
    const session = await sessionController.delete(parseInt(req.params.id, 10));
    res.status(200).json(session);
  } catch (error) {
    res.status(400).json({ error: error });
  }
}) as RequestHandler);

export default router;
