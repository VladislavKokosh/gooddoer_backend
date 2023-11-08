import { Router } from 'express';
import userRouter from './user';
import uploadRouter from './files';
import fundraiserRouter from './fundraisers';
import imageRouter from './image';

const router = Router();

router.use('/user', userRouter);
router.use('/upload', uploadRouter);
router.use('/fundraisers', fundraiserRouter);
router.use('/image', imageRouter);

export default router;
