import express, { type Express, type Request, type Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port: string = process.env.PORT !== undefined ? process.env.PORT : '8000';

app.get('/', (req: Request, res: Response) => {
  res.send('Init Project!');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
