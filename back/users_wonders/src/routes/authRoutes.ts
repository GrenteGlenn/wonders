import { RequestHandler, Router } from 'express';
import AuthController from '../controllers/AuthController';
import UserInterface from '../interfaces/UserInterface';
import { checkPassword, decryptPassword, encryptPassword } from '../lib/CheckPassword';
import { createJWT, createToken, decryptToken, updateJWT } from '../lib/JWT';
import { sendMail } from '../lib/Mailer';

const router = Router();

const authController = new AuthController();

interface TokenCustom {
  userId: number;
  email: string;
  iat: number;
  exp: number;
}

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

router.get('/send_mail', (async (req, res) => {
  const body = <UserInterface>req.body;

  const user = await authController.getOneByEmail(body.email);
  if (!user) {
    return res.json('User not found');
  }

  const token = createToken(user);

  const from: string = '<from email ID>';
  const to: string = '<to email id>';
  const subject: string = '<subject>';

  const resetPasswordLink = `http://localhost:3000/reset-password/${token}`;

  const mailTemplate = `
    <p>Hello,</p>
    <p>You have requested to reset your password. Please click on the link below to reset your password:</p>
    <a href="${resetPasswordLink}">${resetPasswordLink}</a>
    <p>If you did not request this, please ignore this email.</p>
  `;

  sendMail(from, to, subject, mailTemplate);
  res.status(200).json(token);
}) as RequestHandler);

router.post('/forgot_password', (async (req, res) => {
  const body = <Body>req.body;
  const token = <TokenCustom>decryptToken(body.token);

  await authController.updatePassword(token.userId, body.password);

  res.status(200).json('Reset password successfully.');
}) as RequestHandler);

export default router;
