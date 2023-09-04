import path from 'path';
import { type Request, type Response } from 'express';

export const downloadFile = async (req: Request, res: Response): Promise<void> => {
  const { filename } = req.params;

  if (!filename) {
    res.status(400).json({ message: 'Request should have filename in params' });
  }

  const filePath = path.join(__dirname, '../../uploads', filename);

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error serving the file');
    }
  });
};

export const uploadFile = async (req: Request, res: Response): Promise<void> => {
  const fileName = req.file.fieldname;

  res.status(200).json({ fileName });
};
