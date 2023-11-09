import { Router } from 'express';
import { type RequestHandler } from 'express-serve-static-core';
import * as imageController from '../controllers/image';
import { upload } from '../middleware';

const router = Router();

router.get('/', (async (req, res) => {
  await imageController.getImage(req, res);
}) as RequestHandler);

router.post('/', upload.single('file'), (async (req, res) => {
  await imageController.uploadImage(req, res);
}) as RequestHandler);

export default router;
