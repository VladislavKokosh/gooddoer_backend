import dotenv from 'dotenv';
import { type CIDString, Web3Storage } from 'web3.storage';
import { File } from '@web-std/file';

dotenv.config();

const getAccessToken = (): string => process.env.WEB3STORAGE_TOKEN;

const makeStorageClient = (): Web3Storage => new Web3Storage({ token: getAccessToken() });

const makeFileObjects = async (
  fileName: string,
  image: string,
  projectName: string,
  projectDescription: string
): Promise<File[]> => {
  const obj = { fileName, image, projectName, projectDescription };
  const buffer = Buffer.from(JSON.stringify(obj));

  const files = [new File(['contents-of-file-1'], 'plain-utf8.txt'), new File([buffer], 'metadata.json')];
  return files;
};

const fileFromPath = async (file: Express.Multer.File, fileName: string): Promise<File[]> => {
  const mimeType = file.mimetype;

  const files = [new File(['contents-of-file'], mimeType), new File([file.buffer], fileName)];
  return files;
};

const storeFiles = async (file: File[]): Promise<CIDString> => {
  const client = makeStorageClient();
  const cid = await client.put(file);
  return cid;
};

export { makeFileObjects, fileFromPath, storeFiles };
