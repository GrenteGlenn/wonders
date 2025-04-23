import { Request, Response, NextFunction } from 'express';
import verifyUser from '../services/axios';
const userCheck = async function (req: Request, res: Response, next: NextFunction) {
  if (req.headers.authorization) {
    const verify = await verifyUser(req.headers.authorization);
    if (verify) {
      next();
    } else {
      res.status(401).send('Unauthorized');
    }
  } else {
    res.status(401).send('Unauthorized');
  }
};
export default userCheck;
