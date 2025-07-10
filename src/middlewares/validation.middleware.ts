import type { NextFunction, Request, Response } from 'express';
import type { ZodSchema } from 'zod';
import { StatusCodes } from 'http-status-codes';

function createValidator(target: 'body' | 'params', errorMessage: string) {
  return (schema: ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        req[target] = schema.parse(req[target]);
        next();
      }
      catch (error: any) {
        res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          error: errorMessage,
          details: error.errors?.map((err: any) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        });
      }
    };
  };
}

export const validateBody = createValidator('body', 'Données invalides');
export const validateParams = createValidator('params', 'Paramètres invalides');
