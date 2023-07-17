import jwt, { type JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { type IncomingHttpHeaders } from 'http';

dotenv.config();

const SECRET: string | undefined = process.env.SECRET;

export const createToken = (userId: string, publicAddress: string): string => {
  if (!SECRET) {
    throw new Error('Secret key not defined');
  }
  return jwt.sign(
    {
      userId,
      publicAddress,
    },
    SECRET,
    { expiresIn: '1h' }
  );
};

export const getUserIdByToken = (headers: IncomingHttpHeaders): string | JwtPayload | undefined => {
  if (!headers.authorization) {
    return undefined;
  }
  const token = headers.authorization;

  const jwtToken = token?.slice(7);

  if (!SECRET) {
    throw new Error('Secret key not defined');
  }

  const decoded = jwtToken && jwt.verify(jwtToken, SECRET);

  return decoded;
};
