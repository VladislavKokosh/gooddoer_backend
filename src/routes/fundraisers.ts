import { Router } from 'express';
import { type RequestHandler } from 'express-serve-static-core';
import * as fundraiserController from '../controllers/fundraisers';

const router = Router();

router.get('/', (async (req, res) => {
  await fundraiserController.getFundraisers(req, res);
}) as RequestHandler);

router.post('/', (async (req, res) => {
  await fundraiserController.writeNewFundraiser(req, res);
}) as RequestHandler);

export default router;
