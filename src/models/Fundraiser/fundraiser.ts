import { Schema, model } from 'mongoose';
import { type IFundraiser } from './fundraiser.types';
import { isValidEthAddress } from '../../utils';

const userSchema = new Schema<IFundraiser>({
  name: {
    type: String,
    required: [true, 'A name project is required'],
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'A description project is required'],
  },
  fundraiserAddress: {
    type: String,
    required: [true, 'A fundraiserAddress is required'],
    unique: true,
    validate: {
      validator: (address: string) => {
        return isValidEthAddress(address);
      },
      message: 'Address is not valid!',
    },
  },
  fundraisingAmount: {
    type: String,
    require: [true, 'A fundraisingAmount is required'],
  },
  beneficiary: {
    type: String,
    require: [true, 'A beneficiary is required'],
    validate: {
      validator: (address: string) => {
        return isValidEthAddress(address);
      },
      message: 'Address is not valid!',
    },
  },
  category: {
    type: String,
    require: [true, 'A category is required'],
  },
  docs: {
    type: String,
    require: [true, 'A docs is required'],
  },
});

export const Fundraiser = model<IFundraiser & Document>('Fundraiser', userSchema);
