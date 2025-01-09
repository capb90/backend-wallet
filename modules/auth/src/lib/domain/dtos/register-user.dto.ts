import {
  HandlerError,
  validationAdapter
} from '@backend-wallet/shared';
import { z } from 'zod';

const registerSchema = z.object({
  fullName: z.string({message:'El nombre es requerido'}).min(3, 'El nombre debe tener al menos 3 caracteres'),
  email: z.string({message:'El E-mail es requerido'}).email('Debe ser un correo electrónico válido'),
  password: z
    .string({message:'El password es requerido'})
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/[A-Z]/, 'La contraseña debe contener al menos una letra mayúscula')
    .regex(/\d/, 'La contraseña debe contener al menos un número'),
});

export class RegisterUserDto {
  private constructor(
    public fullName: string,
    public email: string,
    public password: string
  ) {}

  public static create(
    object: Record<string, unknown>
  ): [HandlerError?, RegisterUserDto?] {
    try {
      const { fullName, email, password, authProvider } = object;
      const validatedData = validationAdapter.validate(registerSchema, {
        fullName,
        email,
        password,
        authProvider,
      });

      return [
        null,
        new RegisterUserDto(
          validatedData.fullName,
          validatedData.email,
          validatedData.password
        ),
      ];
    } catch (error) {
      return [error as HandlerError, null];
    }
  }
}
