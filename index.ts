import express, { type Express } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import passport from 'passport';
import morgan from 'morgan';
import dotenv from 'dotenv';
import passportStrategy from './src/middleware/passport';
import routes from './src/routes/index';
import { listenGooddoerFactory } from './src/listeners';

dotenv.config();

const PORT: string = process.env.PORT !== undefined ? process.env.PORT : '8000';
const URL: string = process.env.MONGO_URI !== undefined ? process.env.MONGO_URI : '';

const app: Express = express();

app.use(
  cors({
    origin: '*',
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
// eslint-disable-next-line @typescript-eslint/no-floating-promises
passportStrategy(passport);
app.use(morgan('tiny'));
app.use('/', routes);

const start = async (): Promise<void> => {
  try {
    await mongoose.connect(URL);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    listenGooddoerFactory();
  } catch (error) {
    console.log(error);
  }
};

// eslint-disable-next-line @typescript-eslint/no-floating-promises
start();

export default app;
