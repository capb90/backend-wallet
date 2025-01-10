import { HandlerError, validationAdapter } from '@backend-wallet/shared';
import { z } from 'zod';

const loginSchema = z.object({
  email: z
    .string({ message: 'El E-mail es requerido' })
    .email('Debe ser un correo electrónico válido'),
  password: z.string({ message: 'El password es requerido' }),
});

export class LoginUserDto {
  private constructor(public email: string, public password: string) {}

  public static create(
    object: Record<string, unknown>
  ): [HandlerError?, LoginUserDto?] {
    try {
      const dataValidated = validationAdapter.validate(loginSchema, object);
      const response = new LoginUserDto(
        dataValidated.email,
        dataValidated.password
      );
      return [null, response];
    } catch (error) {
      return [error as HandlerError, null];
    }
  }
}
