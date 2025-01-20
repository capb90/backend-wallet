import { HandlerError, validationAdapter } from '@backend-wallet/shared';
import { z } from 'zod';

const verifySchema = z.object({
  email: z
    .string({ message: 'El E-mail es requerido' })
    .email('Debe ser un correo electrónico válido'),
  code: z
    .string({ message: 'El código es requerido' })
    .min(6, 'El código debe tener al menos 6 caracteres'),
});
 
export class VerifyEmailDto {
  constructor(public email: string, public code: string) {}

  public static create(
    object: Record<string, unknown>
  ): [HandlerError?, VerifyEmailDto?] {
    try {
      const data = validationAdapter.validate(verifySchema, object);

      return [null, new VerifyEmailDto(data.email, data.code)];
    } catch (error) {
      return [error as HandlerError, null];
    }
  }
}
