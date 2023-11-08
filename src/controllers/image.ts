import fs from 'fs';
import { type Request, type Response } from 'express';
import { type Document } from 'mongoose';
import { Image } from '../models/Image/image';
import { type IImage } from '../models/Image/image.types';

export const getImage = async (_req: Request, res: Response): Promise<void> => {
  try {
    const image = await Image.find();
    res.status(200).json(image);
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};

export const uploadImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const reqFile = req.file;

    if (!reqFile) {
      res.status(401).send({ message: 'Invalid input' });
    }

    const finalImage = {
      data: reqFile.buffer,
      contentType: reqFile.mimetype,
    };

    const newImage: IImage & Document = new Image({
      name: reqFile.originalname,
      image: finalImage,
    });

    await newImage.save();
    res
      .send({
        message: 'Uploaded',
        id: newImage._id,
      })
      .status(200);
  } catch (error: any) {
    console.log(error);
  }
};
