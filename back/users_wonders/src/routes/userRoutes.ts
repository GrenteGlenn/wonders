import { RequestHandler, Router } from 'express';
import AuthController from '../controllers/AuthController';
import UserInterface from '../interfaces/UserInterface';

const router = Router();

const authController = new AuthController();

router.get('/users', (async (req, res) => {
  const client = await authController.list();
  res.status(200).json(client);
}) as RequestHandler);

router.get('/users/:id', (async (req, res) => {
  const client = await authController.getOne(parseInt(req.params.id, 10));
  res.status(200).json(client);
}) as RequestHandler);

router.put('/users/:id', (async (req, res) => {
  const body = <UserInterface>req.body;
  const client = await authController.update(parseInt(req.params.id, 10), body);
  res.status(200).json(client);
}) as RequestHandler);

router.delete('/users/:id', (async (req, res) => {
  const client = await authController.remove(parseInt(req.params.id, 10));
  res.status(200).json(client);
}) as RequestHandler);

export default router;
