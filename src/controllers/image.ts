import { type Request, type Response } from 'express';
import { type Document } from 'mongoose';
import { Image, type IImage } from '../models/Image';

export const getImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.query;

    if (!id) {
      res.status(400).json({ message: 'Request should have publicAddress in params' });
    }

    const image = await Image.findById(id);

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
