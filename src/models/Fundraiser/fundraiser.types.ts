import type { Document } from 'mongoose';

interface IFundraiser extends Document {
  fundraiserAddress: string;
  fundraisingAmount: string;
  beneficiary: string;
  documentName: string;
  documentUri: string;
  documentHash: string;
}

export type { IFundraiser };
