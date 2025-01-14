import { PrismaClient } from '@prisma/client';
import {
  AuthDatasourceModel,
  LoginUserDto,
  RegisterUserDto,
  UserEntity,
} from '../../domain';
import { HandlerError } from '@backend-wallet/shared';
import { BcryptAdapter } from '../../config';
import { UserMapper } from '../mappers/user.mapper';

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hashed: string) => boolean;

export class AuthDatasource implements AuthDatasourceModel {
  constructor(
    private readonly prismaClient: PrismaClient,
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare
  ) {}

  private handleErrorDb(error: unknown) {
    if (error instanceof HandlerError) {
      throw error;
    }
    throw HandlerError.internalServer();
  }

  public async register(registerDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password } = registerDto;
    try {
      const userExists = await this.prismaClient.user.findUnique({
        where: { email },
      });

      if (userExists) {
        throw HandlerError.notFound(
          `El usuario con el correo ${email} ya se encuentra registrado.`
        );
      }

      const userCreated = await this.prismaClient.user.create({
        data: {
          name,
          email,
          password: this.hashPassword(password),
        },
      });

      return UserMapper.userEntityFromObject(userCreated);
    } catch (error) {
      this.handleErrorDb(error);
    }
  }

  public async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const { email, password } = loginUserDto;
    try {
      const userDB = await this.prismaClient.user.findUnique({
        where: {
          email,
        },
      });

      if (!userDB) {
        throw HandlerError.badRequest('Credenciales inválidas');
      }

      const isPasswordValid = this.comparePassword(password, userDB.password);

      if (!isPasswordValid) {
        throw HandlerError.badRequest('Credenciales inválidas');
      }

      return UserMapper.userEntityFromObject(userDB);
    } catch (error) {
      this.handleErrorDb(error);
    }
  }

  public async validationUserByEmail(email: string): Promise<UserEntity> {
    try {
      const userExists = await this.prismaClient.user.findUnique({
        where: { email },
      });

      if (!userExists) {
        throw HandlerError.notFound(
          `El E-mail ${email} no se encuentra registrado.`
        );
      }

      return UserMapper.userEntityFromObject(userExists);
    } catch (error) {
      this.handleErrorDb(error);
    }
  }

  public async validationEmail(userId: string): Promise<void> {
    try {
      await this.prismaClient.user.update({
        where: { id: userId },
        data: {
          verifyEmail: true,
          emailVerified: new Date(),
        },
      });
    } catch (error) {
      this.handleErrorDb(error);
    }
  }

  public async updateLastLogin(lastLogin: Date, userId: string): Promise<void> {
    try {
      await this.prismaClient.user.update({
        where: { id: userId },
        data: {
          lastLogin,
        },
      });
    } catch (error) {
      this.handleErrorDb(error);
    }
  }
}
