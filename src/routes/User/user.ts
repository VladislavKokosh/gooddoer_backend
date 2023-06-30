import { Router } from 'express';
import * as userController from '../../controllers/User/user';
import { type RequestHandler } from 'express-serve-static-core';

const router = Router();

router.get('/:publicAddress', (async (req, res) => {
  await userController.getNonceByAddress(req, res);
  res.status(204).end();
}) as RequestHandler);

router.post('/signup', (async (req, res) => {
  await userController.newUser(req, res);
  res.status(204).end();
}) as RequestHandler);

router.post('/auth', (async (req, res) => {
  await userController.authentication(req, res);
  res.status(204).end();
}) as RequestHandler);

export default router;
