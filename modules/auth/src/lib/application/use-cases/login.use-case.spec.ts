import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { AuthRepository, EventBus, UserMapper } from '../../infrastructure';
import { LoginUser } from './login.use-case';
import { authType, HandlerError, userStatus } from '@backend-wallet/shared';
import { LoginUserDto } from '../../domain';

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

const [, userMockLogin] = LoginUserDto.create({
  email: 'john@email.com',
  password: 'TestJohn123#',
});

const signTokenMock = jest.fn();

describe('LoginUser.use-case', () => {
  let loginUser: LoginUser;
  let AuthRepositoryMock: DeepMockProxy<AuthRepository>;
  let EventBusMock: DeepMockProxy<EventBus>;

  beforeEach(() => {
    AuthRepositoryMock = mockDeep<AuthRepository>();
    EventBusMock = mockDeep<EventBus>();
    loginUser = new LoginUser(AuthRepositoryMock,EventBusMock, signTokenMock);
  });

  beforeAll(() => {
    jest.restoreAllMocks();
  });

  test('Should login successfully', async () => {
    const tokenMock =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    signTokenMock.mockImplementation(() => Promise.resolve(tokenMock));
    const userEntity = UserMapper.userEntityFromObject(userResponseDb);
    AuthRepositoryMock.login.mockResolvedValue(userEntity);

    const response = {
      token: tokenMock,
      user: userEntity,
    };

    await expect(loginUser.execute(userMockLogin)).resolves.toEqual(response);
  });

  test('Should throw error if token not found', async () => {
    signTokenMock.mockImplementation(() => Promise.resolve(null));
    const userEntity = UserMapper.userEntityFromObject(userResponseDb);
    AuthRepositoryMock.login.mockResolvedValue(userEntity);
    const error = HandlerError.internalServer('Error al generar el Token.');
    await expect(loginUser.execute(userMockLogin)).rejects.toEqual(error)
  })
});
