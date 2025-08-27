import { Request, Response, NextFunction } from 'express';

const ADDRESS_USER = process.env.ADDRESS_USER;

export const userCheck = function (req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
  if (!token) return res.status(401).send('Unauthorized');

  fetch(`${ADDRESS_USER}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(401).send('Unauthorized');
    });
};
