import {
  userStatus,
  validationAdapter
} from '@backend-wallet/shared';
import { number, z } from 'zod';
import { UserEntity } from '../../domain';

const userEntitySchema = z.object({
  id: number({ message: 'Id omitido en base de datos' }),
  fullName: z.string({ message: 'Nombre completo omitido en base de datos' }),
  email: z.string({ message: 'email omitido en base de datos' }),
  verifyEmail: z.boolean(),
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
      validatedData.fullName,
      validatedData.email,
      validatedData.verifyEmail,
      validatedData.status,
      validatedData.image,
      validatedData.lastLogin,
      validatedData.createdAt,
      validatedData.updatedAt
    );
  }
}
