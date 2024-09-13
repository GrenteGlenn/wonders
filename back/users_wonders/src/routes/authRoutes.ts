import { RequestHandler, Router } from 'express';
import AuthController from '../controllers/AuthController';
import UserInterface from '../interfaces/UserInterface';
import { decryptPassword, encryptPassword } from '../lib/CheckPassword';
import { createJWT, updateJWT } from '../lib/JWT';

const router = Router();

const authController = new AuthController();

router.post('/auth', (async (req, res, next) => {
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
    const password = decryptPassword(client.password, client.iv, client.auth_tag);
    if (password === body.password) {
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
}) as RequestHandler);

router.post('/refresh', ((req, res) => {
  const token = 'token';
  updateJWT(token);
  // if (refresh) res.status(200).json({ refresh });
  // else res.json('refresh fail');
  res.json('test');
}) as RequestHandler);

router.post('/register', (async (req, res) => {
  const body = <UserInterface>req.body;
  // const check = checkPassword(body.password);
  // if (check.score === 1) return res.json(check.feedback);
  const newPass = encryptPassword(body.password);
  body.password = newPass.encryptedData;
  body.iv = newPass.iv;
  body.auth_tag = newPass.auth_tag;
  const client = await authController.getOneByEmail(body.email);
  if (client) return res.json('client already registered');
  else await authController.new(body);
  res.status(200).json('client created successfully.');
}) as RequestHandler);

export default router;
