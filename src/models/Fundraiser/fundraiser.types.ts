import type { Document } from 'mongoose';

interface IFundraiser extends Document {
  name: string;
  description: string;
  fundraiserAddress: string;
  fundraisingAmount: string;
  beneficiary: string;
  category: string;
  docs: string;
  image: {
    data: Buffer;
    contentType: string;
  };
}

export type { IFundraiser };
