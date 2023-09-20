import { Schema, model } from 'mongoose';
import { type IFundraiser } from './fundraiser.types';
import { isValidEthAddress } from '../../utils';

const userSchema = new Schema<IFundraiser>({
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
  documentName: {
    type: String,
    require: [true, 'A documentName is required'],
  },
  documentUri: {
    type: String,
    require: [true, 'A documentUri is required'],
  },
  documentHash: {
    type: String,
    require: [true, 'A documentHash is required'],
  },
});

export const Fundraiser = model<IFundraiser & Document>('Fundraiser', userSchema);
