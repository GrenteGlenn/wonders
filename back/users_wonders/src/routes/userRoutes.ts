import { RequestHandler, Router } from 'express';
import AuthController from '../controllers/AuthController';
import UserInterface from '../interfaces/UserInterface';
import { decryptJWT } from '../lib/JWT';
import { JwtPayload } from '../interfaces/Global';

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

router.get('/me', (async (req, res) => {
  const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
  let decrypt;

  if (token) decrypt = decryptJWT(token) as JwtPayload;
  else res.status(401).json('Not authorized');

  if (!decrypt) {
    res.status(401).json('Not authorized');
  } else {
    const client = await authController.getOneByEmail(decrypt.email);

    if (!client) return res.status(401).json('Not authorized');
    res.status(200).json(client);
  }
}) as RequestHandler);

router.get('/me', (async (req, res) => {
  const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
  let decrypt;
  if (token) decrypt = decryptJWT(token) as JwtPayload;
  else res.status(401).json('Not authorized');
  if (!decrypt) {
    res.status(401).json('Not authorized');
  } else {
    const client = await authController.getOneByEmail(decrypt.email);
    if (!client) return res.status(401).json('Not authorized');
    res.status(200).json(client);
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
    res.status(500).json(error);
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
