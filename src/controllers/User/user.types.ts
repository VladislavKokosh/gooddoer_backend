import { type Request } from 'express';

interface UserRequest extends Request {
  publicAddress: string;
}

export type { UserRequest };
