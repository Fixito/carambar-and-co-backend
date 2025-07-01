import { StatusCodes } from 'http-status-codes';

export class AppError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string, id?: string) {
    const message = id ? `${resource} avec l'ID ${id} introuvable` : `${resource} introuvable`;
    super(message, StatusCodes.NOT_FOUND);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, StatusCodes.BAD_REQUEST);
  }
}

export class DatabaseError extends AppError {
  constructor(message: string) {
    super(message, StatusCodes.INTERNAL_SERVER_ERROR);
  }
}
