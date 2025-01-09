import { ZodIssue } from 'zod';
import { IErrorResponse } from '../models';

export class HandlerError extends Error implements IErrorResponse {
  private constructor(
    public readonly code: number,
    public readonly message: string,
    public readonly errors?: ZodIssue[]
  ) {
    super(message);
  }

  public static badRequest(message: string, errors: ZodIssue[]) {
    return new HandlerError(400, message, errors);
  }

  public static unauthorized(message: string) {
    return new HandlerError(401, message);
  }

  public static forbidden(message: string) {
    return new HandlerError(403, message);
  }

  public static notFound(message: string) {
    return new HandlerError(404, message);
  }

  public static internalServer() {
    return new HandlerError(500, 'Error interno del servidor');
  }
}
