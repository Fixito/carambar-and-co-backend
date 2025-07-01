import type { NextFunction, Request, Response } from 'express';
import type { ZodSchema } from 'zod';
import { StatusCodes } from 'http-status-codes';

export function validateBody(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schema.parse(req.body);
      next();
    }
    catch (error: any) {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        error: 'Données invalides',
        details: error.errors?.map((err: any) => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      });
    }
  };
}

export function validateParams(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.params = schema.parse(req.params);
      next();
    }
    catch (error: any) {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        error: 'Paramètres invalides',
        details: error.errors?.map((err: any) => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      });
    }
  };
}
