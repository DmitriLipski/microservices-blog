import express from 'express';
import bodyParser from 'body-parser';
import { eventRouter } from './api/routers/eventRouter';

const app = express();
app.use(bodyParser.json());
app.use(eventRouter);

export default app;
