import User from '../../models/user';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from '../interfaces/Global';

const SECRET_TOKEN = process.env.SECRET_TOKEN;
const SECRET = process.env.SECRET;

export function createJWT(user: User) {
  if (SECRET !== undefined) {
    return jwt.sign(
      {
        userId: user?.id,
        email: user?.email
      },
      SECRET,
      { expiresIn: '1h' }
    );
  } else {
    return 'Secret is undefined';
  }
}

export function updateJWT(token: string) {
  if (SECRET !== undefined) {
    const decode = jwt.verify(token, SECRET) as JwtPayload;

    if (decode) {
      return jwt.sign(
        {
          userId: decode.userId,
          email: decode.email
        },
        SECRET,
        { expiresIn: '1h' }
      );
    } else {
      return null;
    }
  } else {
    return 'Secret is undefined';
  }
}

export function decryptJWT(token: string) {
  if (SECRET !== undefined) {
    return jwt.verify(token, SECRET);
  } else {
    return 'Secret is undefined';
  }
}

export function createToken() {
  if (SECRET_TOKEN !== undefined) {
    return jwt.sign({}, SECRET_TOKEN, { expiresIn: '1h' });
  } else {
    return 'Secret is undefined';
  }
}

export function decryptToken(token: string) {
  if (SECRET_TOKEN !== undefined) {
    return jwt.verify(token, SECRET_TOKEN);
  } else {
    return 'Secret is undefined';
  }
}
