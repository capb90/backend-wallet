import {
  userStatus,
  validationAdapter
} from '@backend-wallet/shared';
import { z } from 'zod';
import { UserEntity } from '../../domain';

const userEntitySchema = z.object({
  id: z.string({ message: 'Id omitido en base de datos' }),
  name: z.string({ message: 'Nombre completo omitido en base de datos' }),
  email: z.string({ message: 'email omitido en base de datos' }),
  verifyEmail: z.boolean(),
  emailVerified:z.date().nullable(),
  image:z.string().nullable(),
  status: z.nativeEnum(userStatus),
  lastLogin: z.date().nullable(),
  createdAt: z.date({ message: 'Fecha de creación omitido en base de datos' }),
  updatedAt: z.date().nullable(),
});

export class UserMapper {
  static userEntityFromObject(object: Record<string, unknown>) {
    const validatedData = validationAdapter.validate(userEntitySchema, object);

    return new UserEntity(
      validatedData.id,
      validatedData.name,
      validatedData.email,
      validatedData.verifyEmail,
      validatedData.emailVerified,
      validatedData.status,
      validatedData.image,
      validatedData.lastLogin,
      validatedData.createdAt,
      validatedData.updatedAt
    );
  }
}
