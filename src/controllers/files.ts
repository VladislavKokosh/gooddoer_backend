import { type Request, type Response } from 'express';
import { fileFromPath, makeFileObjects, storeFiles } from '../storage';
import { toBytes32 } from '../utils';

// export const downloadFile = async (req: Request, res: Response): Promise<void> => {
//   const { filename } = req.params;

//   if (!filename) {
//     res.status(400).json({ message: 'Request should have filename in params' });
//   }

//   const filePath = path.join(__dirname, '../../uploads', filename);

//   res.sendFile(filePath, (err) => {
//     if (err) {
//       res.status(500).send(err);
//     }
//   });
// };

export const web3StorageUpload = async (req: Request, res: Response): Promise<void> => {
  const reqFile = req.file;
  console.log(reqFile);
  console.log(`Uploading image: [${reqFile.originalname}] to ipfs.`);

  if (!reqFile) {
    res.status(401).send({ message: 'invalid input' });
  }

  const imageName = `${toBytes32(new Date().getTime().toString() + '_' + reqFile.originalname)}`;
  console.log(imageName);
  const file = await fileFromPath(reqFile, imageName);
  console.log(file);
  const imageCid = await storeFiles(file);
  console.log(imageCid);
  const files = await makeFileObjects(imageName, `https://${imageCid}.ipfs.w3s.link/${imageName}`);
  console.log(files);
  const metaDataCid = await storeFiles(files);
  console.log(metaDataCid);
  const metadataUrl = `https://${metaDataCid}.ipfs.w3s.link/metadata.json`;

  const ipfsTierInfo = {
    name: reqFile.originalname.slice(0, reqFile.originalname.indexOf('.')),
    ipfsUrl: metadataUrl,
  };

  res.status(200).send(ipfsTierInfo);
};
