import { Request, Response, NextFunction } from 'express';
import { ResponseMe } from '../interface/Global';

const ADDRESS_USER = process.env.ADDRESS_USER;

export const adminCheck = function (req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
  if (!token) return res.status(401).send('Unauthorized');

  fetch(`${ADDRESS_USER}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => res.json())
    .then((body: ResponseMe) => {
      if (body.role_id <= 1) {
        res.status(401).send('Unauthorized');
      }
      next();
    })
    .catch(() => {
      res.status(401).send('Unauthorized');
    });
};
