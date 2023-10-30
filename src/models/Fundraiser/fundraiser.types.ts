import type { Document } from 'mongoose';

interface IFundraiser extends Document {
  name: string;
  description: string;
  fundraiserAddress: string;
  fundraisingAmount: string;
  beneficiary: string;
  category: string;
}

export type { IFundraiser };
