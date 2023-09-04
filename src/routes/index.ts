import { Router } from 'express';
import userRouter from './user';
import uploadRouter from './files';

const router = Router();

router.use('/user', userRouter);
router.use('/upload', uploadRouter);

export default router;
