import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

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
