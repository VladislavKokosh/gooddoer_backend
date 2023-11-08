import { Schema, model } from 'mongoose';

import { type IImage } from './image.types';

const imageSchema = new Schema<IImage>({
  name: String,
  image: {
    data: Buffer,
    contentType: String,
  },
});

export const Image = model<IImage & Document>('Image', imageSchema);
