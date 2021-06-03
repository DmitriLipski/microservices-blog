import express from 'express';
import bodyParser from 'body-parser';
import { commentRouter } from './api/routers/commentRouter';

const app = express();
app.use(bodyParser.json());
app.use(commentRouter);

export default app;
