import User from '../../models/user';
import * as jwt from 'jsonwebtoken';

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
  const decode = jwt.verify(token, 'secret');
  console.log(decode);
  // if (decode) {
  //   return jwt.sign(
  //     {
  //       userId: 0,
  //       email: 'test'
  //     },
  //     'secret',
  //     { expiresIn: '1h' }
  //   );
  // } else {
  //   return null;
  // }
}

export function decryptJWT(token: string) {
  return jwt.verify(token, 'secret');
}
