import express from 'express';
import bodyParser from 'body-parser';
import { postRouter } from './api/routers/postRouter';
import { eventRouter } from './api/routers/eventRouter';

const app = express();
app.use(bodyParser.json());
app.use(postRouter);
app.use(eventRouter);

export default app;
