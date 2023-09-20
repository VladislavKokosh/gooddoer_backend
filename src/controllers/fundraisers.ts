import { type Document } from 'mongoose';
import { type Request, type Response } from 'express';

import { Fundraiser } from '../models/Fundraiser/fundraiser';
import { type IFundraiser } from '../models/Fundraiser/fundraiser.types';

export const getFundraisers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const fundraisers = await Fundraiser.find();
    res.status(200).json(fundraisers);
  } catch (err) {
    res.status(401).json({
      message: err.message,
    });
  }
};

export const writeNewFundraiser = async (
  fundraiserAddress: string,
  fundraisingAmount: string,
  beneficiary: string,
  documentName: string,
  documentUri: string,
  documentHash: string
): Promise<void> => {
  try {
    const newFundraiser: IFundraiser & Document = new Fundraiser({
      fundraiserAddress,
      fundraisingAmount,
      beneficiary,
      documentName,
      documentUri,
      documentHash,
    });

    await newFundraiser.save().catch((err: any) => {
      console.log(err);
    });
  } catch (err: any) {
    console.log(err);
  }
};
