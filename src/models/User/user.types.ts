import type { Document } from 'mongoose';

interface IUser extends Document {
  id: string;
  nonce: string;
  publicAddress: string;
  username?: string;
}

export type { IUser };
