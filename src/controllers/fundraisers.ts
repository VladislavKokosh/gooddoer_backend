import { type Document } from 'mongoose';
import { type Request, type Response } from 'express';

import { Fundraiser } from '../models/Fundraiser/fundraiser';
import { type IFundraiser } from '../models/Fundraiser/fundraiser.types';

export const getFundraisers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const fundraisers = await Fundraiser.find();
    res.status(200).json(fundraisers);
  } catch (error) {
    res.status(401).json({
      message: error.message,
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

    await newFundraiser.save();
  } catch (error: any) {
    console.log(error);
  }
};
