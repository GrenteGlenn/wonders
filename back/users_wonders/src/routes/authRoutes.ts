import { RequestHandler, Router } from 'express';
import AuthController from '../controllers/AuthController';
import UserInterface from '../interfaces/UserInterface';
import { checkPassword, decryptPassword, encryptPassword } from '../lib/CheckPassword';
import { createJWT, updateJWT } from '../lib/JWT';

const router = Router();

const authController = new AuthController();

router.post('/login', (async (req, res, next) => {
  try {
    const body = <UserInterface>req.body;
    let token;
    let client;
    try {
      client = await authController.getOneByEmail(body.email);
    } catch (err) {
      console.log(err);
      const error = new Error('Error! Something went wrong.0');
      return next(error);
    }

    if (client) {
      const isCorrect = await decryptPassword(client.password, body.password);
      if (isCorrect) {
        try {
          token = createJWT(client);
          res.status(200).json({
            success: true,
            data: {
              userId: client?.id,
              email: client?.email,
              token: token
            }
          });
        } catch (err) {
          console.log(err);
          const error = new Error('Error! Something went wrong1.');
          return next(error);
        }
      }
    } else return res.json('password or identifiant incorrect');
  } catch (error) {
    res.status(400).json({ error: error });
  }
}) as RequestHandler);

router.post('/refresh', ((req, res) => {
  try {
    let refresh;
    const token = req.headers.authorization?.split(' ')[1];
    if (token) refresh = updateJWT(token);
    if (refresh) res.status(200).json({ refresh });
    else res.json('refresh fail');

  } catch (error) {
    res.status(400).json({ error: error });
  }
}) as RequestHandler);

router.post('/register', (async (req, res) => {
  try {
    const body = <UserInterface>req.body;
    const check = checkPassword(body.password);
    if (check.score === 1) return res.json(check.feedback);
    body.password = await encryptPassword(body.password);
    const client = await authController.getOneByEmail(body.email);
    if (client) return res.json('client already registered');
    else await authController.create(body);
    res.status(200).json('client created successfully.');

  } catch (error) {
    res.status(400).json({ error: error });
  }
}) as RequestHandler);

export default router;
