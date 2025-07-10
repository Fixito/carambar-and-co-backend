import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import cors from 'cors';
import express from 'express';
import { StatusCodes } from 'http-status-codes';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yaml';

import { errorHandler } from './middlewares/error-handler.middleware.js';
import { notFound } from './middlewares/not-found.middleware.js';
import { applySecurity, corsConfig } from './middlewares/security.middleware.js';

import jokesRoutes from './routes/jokes.routes.js';

import 'dotenv/config';

const app = express();

applySecurity(app);

const swaggerDocument = YAML.parse(
  readFileSync(join(import.meta.dirname, '..', 'docs', 'api.yaml'), 'utf8'),
);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Carambar & Co API Documentation',
}));

app.use(morgan('dev'));
app.use(cors(corsConfig));
app.use(express.json({ limit: '1mb' }));

app.get('/', (_req, res) => {
  res.status(StatusCodes.OK).json({
    message: 'Bienvenue sur l\'API Carambar & Co !',
    documentation: '/api-docs',
    version: '1.0.0',
    endpoints: {
      blagues: '/api/v1/blagues',
      documentation: '/api-docs',
    },
  });
});

app.use('/api/v1/blagues', jokesRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
