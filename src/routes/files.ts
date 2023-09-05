import { Router } from 'express';
import { type RequestHandler } from 'express-serve-static-core';
import * as uploadController from '../controllers/files';
import { upload } from '../middleware/upload';

const router = Router();

router.get('/:filename', (async (req, res) => {
  await uploadController.downloadFile(req, res);
}) as RequestHandler);

router.post('/', upload.single('file'), (async (req, res) => {
  try {
    await uploadController.uploadFile(req, res);
  } catch (e) {
    console.log(e);
  }
}) as RequestHandler);

export default router;