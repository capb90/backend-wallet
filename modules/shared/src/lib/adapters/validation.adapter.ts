import { z, ZodSchema } from 'zod';
import { HandlerError } from '../utils';

interface IValidationAdapter {
  validate<T>(schema: ZodSchema<T>, data: unknown): T;
}

class ZodValidationAdapter implements IValidationAdapter {
  validate<T>(schema: ZodSchema<T>, data: unknown): T {
    try {
      return schema.parse(data);
    } catch (err) {
      if (err instanceof z.ZodError) {
        throw HandlerError.badRequest('Error de validación', err.errors);
      }

      throw HandlerError.internalServer()
    }
  }
}

export const validationAdapter = new ZodValidationAdapter();
