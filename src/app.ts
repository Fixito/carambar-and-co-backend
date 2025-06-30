import express from 'express';
import morgan from 'morgan';

import * as middlewares from './middlewares.js';
import jokes from './routes/jokes.route.js';

import 'dotenv/config';

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1/blagues', jokes);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;
