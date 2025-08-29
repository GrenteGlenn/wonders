import AuthController from '../controllers/AuthController';
import { decryptJWT } from '../lib/JWT';
import { JwtPayload } from '../interfaces/Global';
import { NextFunction, Request, Response } from 'express';

const authController = new AuthController();

const adminCheck = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
  if (!token) return res.status(401).send('Unauthorized');

  const decrypt = decryptJWT(token) as JwtPayload;
  if (!decrypt) return res.status(403).send('Forbidden');

  authController
    .getOneByEmail(decrypt.email)
    .then((client) => {
      if (!client) return res.status(403).send('Forbidden');
      if (client.role_id < 2) return res.status(403).send('Forbidden');
      next();
    })
    .catch((err) => next(err));
};

export default adminCheck;
