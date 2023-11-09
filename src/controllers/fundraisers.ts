import { type Document } from 'mongoose';
import { type Request, type Response } from 'express';

import { Fundraiser, type IFundraiser } from '../models/Fundraiser';
import { Image } from '../models/Image';

export const getFundraisers = async (_req: Request, res: Response): Promise<void> => {
  try {
    const fundraisers = await Fundraiser.find();
    const updatedFundraisers = fundraisers.map((fundraiser) => {
      return { ...fundraiser, image: Image.findById(fundraiser.image) };
    });
    res.status(200).json(updatedFundraisers);
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};

export const writeNewFundraiser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, fundraiserAddress, fundraisingAmount, beneficiary, category, docs } = req.body;
    const image = req.file;
    if (
      !name ||
      !description ||
      !fundraiserAddress ||
      !fundraisingAmount ||
      !beneficiary ||
      !category ||
      !docs ||
      !image
    ) {
      res.status(400).send({
        error: 'Request should have name, description, fundraiserAddress, fundraisingAmount, beneficiary, docs, image',
      });
      return;
    }

    const finalImage = {
      data: image.buffer,
      contentType: image.mimetype,
    };

    const newFundraiser: IFundraiser & Document = new Fundraiser({
      name,
      description,
      fundraiserAddress,
      fundraisingAmount,
      beneficiary,
      category,
      docs,
      finalImage,
    });

    await newFundraiser.save();
    res.status(200);
  } catch (error: any) {
    console.log(error);
  }
};
