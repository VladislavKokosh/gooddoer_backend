import { type Request, type Response } from 'express';
import { fileFromPath, makeFileObjects, storeFiles } from '../storage';
import { toBytes32 } from '../utils';

export const web3StorageUpload = async (req: Request, res: Response): Promise<void> => {
  const { projectName, projectDescription } = req.params;
  const reqFile = req.file;

  console.log(`Uploading image: [${reqFile.originalname}] to ipfs.`);

  if (!reqFile || !projectName || !projectDescription) {
    res.status(401).send({ message: 'Invalid input' });
  }

  const imageName = `${toBytes32(new Date().getTime().toString() + '_' + reqFile.originalname)}`;

  const file = await fileFromPath(reqFile, imageName);

  const imageCid = await storeFiles(file);

  const files = await makeFileObjects(
    imageName,
    `https://${imageCid}.ipfs.w3s.link/${imageName}`,
    projectName,
    projectDescription
  );

  const metaDataCid = await storeFiles(files);

  const metadataUrl = `https://${metaDataCid}.ipfs.w3s.link/metadata.json`;

  const ipfsTierInfo = {
    name: reqFile.originalname.slice(0, reqFile.originalname.indexOf('.')),
    ipfsUrl: metadataUrl,
  };

  res.status(200).send(ipfsTierInfo);
};
