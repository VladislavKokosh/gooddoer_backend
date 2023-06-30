import { Router } from 'express';
import * as userController from '../../controllers/User/user';
import { type RequestHandler } from 'express-serve-static-core';

const router = Router();

router.get('/:id', (async (req, res) => {
  await userController.getUserById(req, res);
}) as RequestHandler);

router.get('/nonce/:publicAddress', (async (req, res) => {
  await userController.getNonceByAddress(req, res);
}) as RequestHandler);

router.post('/signup', (async (req, res) => {
  await userController.newUser(req, res);
}) as RequestHandler);

router.post('/auth', (async (req, res) => {
  await userController.authentication(req, res);
}) as RequestHandler);

router.post('/username', (async (req, res) => {
  await userController.changeUsername(req, res);
}) as RequestHandler);

export default router;
