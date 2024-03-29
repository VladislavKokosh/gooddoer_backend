import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { type IUser } from './user.types';
import { isValidEthAddress } from '../../utils';

const userSchema = new Schema<IUser>({
  nonce: {
    type: String,
    required: [true, 'A nonce is required'],
    unique: true,
    default: () => uuidv4(),
  },
  publicAddress: {
    type: String,
    required: [true, 'A publicAddress is required'],
    unique: true,
    validate: {
      validator: (address: string) => {
        return isValidEthAddress(address);
      },
      message: 'Address is not valid!',
    },
  },
  username: {
    type: String,
    unique: true,
    validate: {
      validator: (username: string) => {
        return username.length > 3;
      },
      message: 'Username is not valid!',
    },
  },
});

export const User = model<IUser & Document>('User', userSchema);
