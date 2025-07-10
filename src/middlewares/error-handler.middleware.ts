import type { NextFunction, Request, Response } from 'express';
import process from 'node:process';
import { StatusCodes } from 'http-status-codes';

import { AppError } from '../utils/errors.js';

export function errorHandler(err: Error | AppError, _req: Request, res: Response, _next: NextFunction) {
  let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
  let message = 'Erreur interne du serveur';

  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }
  else if (res.statusCode !== StatusCodes.OK) {
    statusCode = res.statusCode;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
}
