import passport from 'passport';
import { Router } from 'express';
import { type RequestHandler } from 'express-serve-static-core';
import * as userController from '../controllers/user';

const router = Router();

router.get('/:id', (async (req, res) => {
  await userController.getUserById(req, res);
}) as RequestHandler);

router.get('/nonce/:publicAddress', (async (req, res) => {
  await userController.getNonceByAddress(req, res);
}) as RequestHandler);

router.post('/auth', (async (req, res) => {
  await userController.authentication(req, res);
}) as RequestHandler);

router.put('/', passport.authenticate('jwt', { session: false }), (async (req, res) => {
  await userController.changeUsername(req, res);
}) as RequestHandler);

export default router;
