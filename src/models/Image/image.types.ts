import type { Document } from 'mongoose';

interface IImage extends Document {
  name: string;
  image: {
    data: Buffer;
    contentType: string;
  };
}

export type { IImage };
