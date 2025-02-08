import { envs } from './envs';

describe('envs config', () => {
  test('Should have mode setting TEST', () => {
    expect(envs.MODE).toBe('TEST');
  });
});
