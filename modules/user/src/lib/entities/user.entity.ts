import { UserStatus } from '@prisma/client';
import { userStatus, validationAdapter } from '@backend-wallet/shared';
import { z } from 'zod';

const userValidationSchema = z.object({
  id: z.string({ message: 'Id omitido en base de datos' }),
  name: z.string({ message: 'Nombre completo omitido en base de datos' }),
  email: z.string({ message: 'email omitido en base de datos' }),
  verifyEmail: z.boolean(),
  emailVerified: z.date().nullable(),
  image: z.string().nullable(),
  status: z.nativeEnum(userStatus),
  lastLogin: z.date().nullable(),
  createdAt: z.date({ message: 'Fecha de creación omitido en base de datos' }),
  updatedAt: z.date().nullable(),
});

export class UserEntity {
  private constructor(
    public id: string,
    public name: string,
    public email: string,
    public verifyEmail: boolean,
    public emailVerified: Date | null,
    public status: UserStatus,
    public image: string | null,
    public lastLogin: Date | null,
    public createdAt: Date,
    public updatedAt: Date | null
  ) {}

  public static toEntity(object: Record<string, unknown>) {
    const validatedData = validationAdapter.validate(
      userValidationSchema,
      object
    );

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
