import { type Request, type Response } from 'express';
import { fileFromPath, makeFileObjects, storeFiles } from '../storage';
import { toBytes32 } from '../utils';

export const web3StorageUpload = async (req: Request, res: Response): Promise<void> => {
  const reqFile = req.file;

  console.log(`Uploading file: [${reqFile.originalname}] to ipfs.`);

  if (!reqFile) {
    res.status(401).send({ message: 'invalid input' });
  }

  const fileName = `${toBytes32(new Date().getTime().toString() + '_' + reqFile.originalname)}`;

  const file = await fileFromPath(reqFile, fileName);

  const fileCid = await storeFiles(file);

  const files = await makeFileObjects(fileName, `https://${fileCid}.ipfs.w3s.link/${fileName}`);

  const metaDataCid = await storeFiles(files);

  const metadataUrl = `https://${metaDataCid}.ipfs.w3s.link/metadata.json`;

  const ipfsTierInfo = {
    name: reqFile.originalname.slice(0, reqFile.originalname.indexOf('.')),
    ipfsUrl: metadataUrl,
  };

  res.status(200).send(ipfsTierInfo);
};
