import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';

import * as middlewares from './middlewares.js';

const app = express();

app.use(morgan("dev"));

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;