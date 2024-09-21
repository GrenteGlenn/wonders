import { RequestHandler, Router } from 'express';
import AuthController from '../controllers/AuthController';
import UserInterface from '../interfaces/UserInterface';

const router = Router();

const authController = new AuthController();

router.get('/', (async (req, res) => {
  const client = await authController.list();
  res.status(200).json(client);
}) as RequestHandler);

router.get('/:id', (async (req, res) => {
  const client = await authController.getOne(parseInt(req.params.id, 10));
  res.status(200).json(client);
}) as RequestHandler);

router.put('/:id', (async (req, res) => {
  const body = <UserInterface>req.body;
  const client = await authController.update(parseInt(req.params.id, 10), body);
  res.status(200).json(client);
}) as RequestHandler);

router.delete('/:id', (async (req, res) => {
  const client = await authController.remove(parseInt(req.params.id, 10));
  res.status(200).json(client);
}) as RequestHandler);

export default router;
