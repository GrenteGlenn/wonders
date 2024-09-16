import User from '../../models/user';
import * as jwt from 'jsonwebtoken';

interface Data {
  userId: number;
  email: string;
  iat: number;
  exp: number;
}

export function createJWT(user: User) {
  return jwt.sign(
    {
      userId: user?.id,
      email: user?.email
    },
    'secret',
    { expiresIn: '1h' }
  );
}

export function updateJWT(token: string) {
  const decode = jwt.verify(token, 'secret') as Data;
  if (decode) {
    return jwt.sign(
      {
        userId: decode.userId,
        email: decode.email
      },
      'secret',
      { expiresIn: '1h' }
    );
  } else {
    return null;
  }
}

export function decryptJWT(token: string) {
  return jwt.verify(token, 'secret');
}
