import { RequestHandler, Router } from 'express';
import SessionController from '../controllers/SessionController';
import SessionInterface from '../interfaces/SessionInterface';

const router = Router();

const sessionController = new SessionController();

router.get('/session', (async (req, res) => {
  const sessions = await sessionController.list();
  res.status(200).json(sessions);
}) as RequestHandler);

router.get('/session/:id', (async (req, res) => {
  const session = await sessionController.getOne(parseInt(req.params.id, 10));
  res.status(200).json(session);
}) as RequestHandler);

router.get('/session/user/:id', (async (req, res) => {
  const session = await sessionController.getByUser(parseInt(req.params.id, 10));
  res.status(200).json(session);
}) as RequestHandler);

router.post('/session', (async (req, res) => {
  const body = <SessionInterface>req.body;
  const session = await sessionController.create(body);
  res.status(200).json(session);
}) as RequestHandler);

router.put('/session/:id', (async (req, res) => {
  const body = <SessionInterface>req.body;
  const session = await sessionController.update(parseInt(req.params.id, 10), body);
  res.status(200).json(session);
}) as RequestHandler);

router.delete('/session/:id', (async (req, res) => {
  const session = await sessionController.delete(parseInt(req.params.id, 10));
  res.status(200).json(session);
}) as RequestHandler);

export default router;
