import { RequestHandler, Router } from 'express';
import AuthController from '../controllers/AuthController';
import UserInterface from '../interfaces/UserInterface';
import { checkPassword, decryptPassword, encryptPassword } from '../lib/CheckPassword';
import { createJWT, createToken, updateJWT } from '../lib/JWT';
import { sendMail } from '../lib/Mailer';
import ResetPasswordController from '../controllers/ResetPasswordController';
import { addHours } from '../lib/Date';

const router = Router();

const authController = new AuthController();
const resetPasswordController = new ResetPasswordController();

interface Body {
  token: string;
  password: string;
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
      } else return res.status(401).json('password or identifiant incorrect');
    } else return res.status(401).json('password or identifiant incorrect');
  } catch (error) {
    res.status(401).json('Error! Something went wrong.');
  }
}) as RequestHandler);

router.post('/refresh', ((req, res) => {
  let refresh;
  const token = req.headers.authorization?.split(' ')[1];
  if (token) refresh = updateJWT(token);
  if (refresh) res.status(200).json({ refresh });
  else res.json('refresh fail');
}) as RequestHandler);

router.post('/register', (async (req, res) => {
  try {
    const body = <UserInterface>req.body;
    const check = checkPassword(body.password);
    if (check.score === 1) return res.json(check.feedback);
    body.password = await encryptPassword(body.password);
    const client = await authController.getOneByEmail(body.email);
    if (client) return res.status(403).json('client already registered');
    else await authController.create(body);
    res.status(201).json('client created successfully.');
  } catch (error) {
    res.status(401).json('Error! Something went wrong.');
  }
}) as RequestHandler);

router.get('/send_mail', (async (req, res) => {
  const body = <UserInterface>req.body;
  try {
    const user = await authController.getOneByEmail(body.email);
    if (!user) {
      return res.status(403).json('User not found');
    }

    const token = createToken();
    const expired_at = addHours(new Date());

    const resetPassword = { token, created_at: new Date(), expired_at, user_id: user.id };

    await resetPasswordController.create(resetPassword);

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
    res.status(200).json({ token: token });
  } catch (error) {
    res.status(401).json('Error! Something went wrong.');
  }
}) as RequestHandler);

router.put('/reset_password/:token', (async (req, res) => {
  const body = <Body>req.body;

  try {
    const resetPassword = await resetPasswordController.getOneByToken(req.params.token);

    if (resetPassword)
      if (new Date() <= resetPassword.expired_at) {
        await authController.updatePassword(resetPassword.user_id, body.password);
      } else {
        return res.json('Reset password link has expired');
      }

    res.status(200).json('Reset password successfully.');
  } catch (error) {
    res.status(401).json('Error! Something went wrong.');
  }
}) as RequestHandler);

export default router;
