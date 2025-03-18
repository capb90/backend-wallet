import { userStatus, validationAdapter } from '@backend-wallet/shared';
import { z } from 'zod';
import { AuthEntity } from '../../domain';

const userEntitySchema = z.object({
  id: z.string({ message: 'Id omitido en base de datos' }),
  name: z.string({ message: 'Nombre completo omitido en base de datos' }),
  status: z.nativeEnum(userStatus),
  email: z.string({ message: 'email omitido en base de datos' }),
  verifyEmail: z.boolean(),
});

export class UserMapper {
  static userEntityFromObject(object: Record<string, unknown>) {
    const validatedData = validationAdapter.validate(userEntitySchema, object);

    return new AuthEntity(
      validatedData.id,
      validatedData.name,
      validatedData.status,
      validatedData.email,
      validatedData.verifyEmail,
    );
  }
}
