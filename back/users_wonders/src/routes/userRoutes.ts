import { RequestHandler, Router } from 'express';
import AuthController from '../controllers/AuthController';
import UserInterface from '../interfaces/UserInterface';

const router = Router();

const authController = new AuthController();

router.get('/', (async (req, res) => {
  try {
    const client = await authController.list();
    res.status(200).json(client);
  } catch (error) {
    res.status(404).json('Error! Something went wrong.');
  }
}) as RequestHandler);

router.get('/:id', (async (req, res) => {
  try {
    const client = await authController.getOne(parseInt(req.params.id, 10));
    res.status(200).json(client);
  } catch (error) {
    res.status(404).json('Error! Something went wrong.');
  }
}) as RequestHandler);

router.put('/:id', (async (req, res) => {
  try {
    const body = <UserInterface>req.body;
    const client = await authController.update(parseInt(req.params.id, 10), body);
    res.status(200).json(client);
  } catch (error) {
    res.status(401).json('Error! Something went wrong.');
  }
}) as RequestHandler);

router.delete('/:id', (async (req, res) => {
  try {
    const client = await authController.remove(parseInt(req.params.id, 10));
    res.status(202).json(client);
  } catch (error) {
    res.status(401).json('Error! Something went wrong.');
  }
}) as RequestHandler);

export default router;
