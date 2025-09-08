import { Request, Response, NextFunction } from 'express';
import { decryptJWT } from '../lib/JWT';
import { JwtPayload } from '../interfaces/Global';
import AuthController from '../controllers/AuthController';

const authController = new AuthController();

export interface AuthedRequest extends Request {
  user?: JwtPayload;
}

const requireAuth = async (req: AuthedRequest, res: Response, next: NextFunction) => {
  try {
    const header = req.headers.authorization;
    if (!header?.startsWith('Bearer ')) {
      return res.status(401).send('Unauthorized');
    }

    const token = header.split(' ')[1];

    let payload: JwtPayload;
    try {
      payload = decryptJWT(token) as JwtPayload; // doit throw si expiré/incorrect
    } catch {
      return res.status(401).send('Token expired or invalid');
    }

    if (!payload?.email) {
      return res.status(401).send('Unauthorized');
    }

    const client = await authController.getOneByEmail(payload.email);
    if (!client) {
      return res.status(401).send('Unauthorized');
    }

    req.user = payload;
    return next();
  } catch (err) {
    return res.status(500).send('Internal server error');
  }
};

export default requireAuth;
