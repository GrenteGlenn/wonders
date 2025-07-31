import { Request, Response, NextFunction } from 'express';
import { decryptJWT } from '../lib/JWT';
import { JwtPayload } from '../interfaces/Global';
import AuthController from '../controllers/AuthController';

const authController = new AuthController();

const userCheck = function (req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
  if (!token) return res.status(401).send('Unauthorized');

  const decrypt = decryptJWT(token) as JwtPayload;
  if (!decrypt) return res.status(403).send('Forbidden');

  authController
    .getOneByEmail(decrypt.email)
    .then((client) => {
      if (!client) return res.status(403).send('Forbidden');
      next();
    })
    .catch((err) => next(err));
};

export default userCheck;
