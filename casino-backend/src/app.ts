import express from 'express';
import bodyParser from 'body-parser';
import router from './routes'
import { connectDB } from './utils/db';

const app = express();

app.use(bodyParser.json());

app.use(router);
connectDB();

export default app;
