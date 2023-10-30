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

export const writeNewFundraiser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, fundraiserAddress, fundraisingAmount, beneficiary, category } = req.body;

    if (!name || !description || !fundraiserAddress || !fundraisingAmount || !beneficiary || !category) {
      res
        .status(400)
        .send({ error: 'Request should have name, description, fundraiserAddress, fundraisingAmount, beneficiary' });
      return;
    }
    const newFundraiser: IFundraiser & Document = new Fundraiser({
      name,
      description,
      fundraiserAddress,
      fundraisingAmount,
      beneficiary,
      category,
    });

    await newFundraiser.save();
    res.status(200);
  } catch (error: any) {
    console.log(error);
  }
};
