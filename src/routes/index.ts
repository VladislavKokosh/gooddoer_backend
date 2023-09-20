import { Router } from 'express';
import userRouter from './user';
import uploadRouter from './files';
import fundraiserRouter from './fundraisers';

const router = Router();

router.use('/user', userRouter);
router.use('/upload', uploadRouter);
router.use('/fundraisers', fundraiserRouter);

export default router;
