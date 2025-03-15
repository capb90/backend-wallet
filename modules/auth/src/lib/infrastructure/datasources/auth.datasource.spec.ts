import { AuthDatasource } from './auth.datasource';
import { LoginUserDto, RegisterUserDto } from '../../domain';
import { authType, HandlerError, userStatus } from '@backend-wallet/shared';
import { UserMapper } from '../mappers/user.mapper';
import { PrismaClient } from '@prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

type Context = {
  prisma:PrismaClient
}

type MockContext = {
  prisma:DeepMockProxy<PrismaClient>
}

const CreateMockContext = ():MockContext => {
  return {
    prisma:mockDeep<PrismaClient>()
  }
}

const userResponseDb = {
  id: 'test1',
  name: 'John Doe',
  email: 'john@email.com',
  password: 'hash123#',
  verifyEmail: false,
  emailVerified: null,
  image: null,
  status: userStatus.ACTIVE,
  lastLogin: null,
  createdAt: new Date(),
  updatedAt: null,
  authProvider: authType.GOOGLE,
  authProviderId: '',
};

const [, userMockRegister] = RegisterUserDto.create({
  name: 'John Doe',
  email: 'john@email.com',
  password: 'TestJohn123#',
});

const [, userMockLogin] = LoginUserDto.create({
  email: 'john@email.com',
  password: 'TestJohn123#',
});

const hashMock = jest.fn();
const compareMock = jest.fn();

describe('AuthDatasource', () => {

  let authDatasource: AuthDatasource;
  let mockCtx: MockContext;
  let ctx: Context;

  beforeEach(() => {
    mockCtx = CreateMockContext();
    ctx = mockCtx as unknown as Context;
    authDatasource = new AuthDatasource(ctx.prisma,hashMock,compareMock);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('Should register new user', async () => {
    const methodResponse = UserMapper.userEntityFromObject(userResponseDb);

    mockCtx.prisma.user.findUnique.mockResolvedValue(null);
    mockCtx.prisma.user.create.mockResolvedValue(userResponseDb);

    await expect(authDatasource.register(userMockRegister)).resolves.toEqual(
      methodResponse
    );
  });

  test('Should throw error if user exist', async () => {
    mockCtx.prisma.user.findUnique.mockResolvedValue(userResponseDb);
    const error = HandlerError.notFound(
      'El usuario con el correo john@email.com ya se encuentra registrado.'
    );

    await expect(authDatasource.register(userMockRegister)).rejects.toEqual(
      error
    );
  });

  test('Should login user', async () => {
    compareMock.mockReturnValue(true);

    const methodResponse = UserMapper.userEntityFromObject(userResponseDb);
    mockCtx.prisma.user.findUnique.mockResolvedValue(userResponseDb);

    await expect(authDatasource.login(userMockLogin)).resolves.toEqual(
      methodResponse
    );
  });

  test('Should throw error if the password is incorrect', async () => {
    compareMock.mockReturnValue(false);
    const error = HandlerError.badRequest('Credenciales inválidas');
    mockCtx.prisma.user.findUnique.mockResolvedValue(userResponseDb);

    await expect(authDatasource.login(userMockLogin)).rejects.toEqual(
      error
    );
  });
});
