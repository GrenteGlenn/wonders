import { RequestHandler, Router } from 'express';
import AuthController from '../controllers/AuthController';
import UserInterface from '../interfaces/UserInterface';

const router = Router();

const authController = new AuthController();

// router.post('/auth', (async (req, res) => {
//   const client = await authController.getOne(parseInt(req.params.id, 10));
//   if (client) {
//     res.json(client);
//   }
// }) as RequestHandler);

router.post('/register', (async (req, res) => {
  const body = <UserInterface>req.body;
  const client = await authController.getOneByEmail(body.email);
  if (client) res.json(client);
  else await authController.new(body);
}) as RequestHandler);

export default router;
