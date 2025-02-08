/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as redis from 'redis';
import { RedisClientApp } from './redis-client';

const mockCacheValue = 'test-value';
const mockCacheKey = 'testKey';
const mockCacheName = 'testCache';
const mockExpireIN = 60;

jest.mock('redis', () => {
  const mClient = {
    connect: jest.fn(),
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
    expire: jest.fn(),
  };

  return { createClient: jest.fn(() => mClient) };
});

describe('RedisClientApp', () => {
  let mockClient: jest.Mocked<any>;

  beforeAll(() => {
    mockClient = redis.createClient();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Should connect to Redis on instantiation', () => {
    new RedisClientApp();
    expect(mockClient.connect).toHaveBeenCalled();
  });

  test('Should call redis.get with correct key', async () => {
    mockClient.get.mockResolvedValue(mockCacheValue);
    const result = await RedisClientApp.get(mockCacheName, mockCacheKey);
    expect(mockClient.get).toHaveBeenCalledWith(
      `${mockCacheName}:${mockCacheKey}`
    );
    expect(result).toBe(mockCacheValue);
  });

  test('Should call redis.set with correct parameters', async () => {
    const fullKey = `${mockCacheName}:${mockCacheKey}`;
    await RedisClientApp.set(mockCacheName,mockCacheKey,mockCacheValue,mockExpireIN);
    expect(mockClient.set).toHaveBeenCalledWith(fullKey,mockCacheValue);
    expect(mockClient.expire).toHaveBeenCalledWith(fullKey,mockExpireIN)
  });

  test('Should call redis.del when removing a key', async () => {
    const fullKey = `${mockCacheName}:${mockCacheKey}`;
    await RedisClientApp.remove(mockCacheName,mockCacheKey);
    expect(mockClient.del).toHaveBeenCalledWith(fullKey);
  });

  test('Should handle errors in get gracefully',async()=>{
    mockClient.get.mockRejectedValue(new Error("Redis error"));
    const consoleSpy = jest.spyOn(console,'error').mockImplementation(()=>{});
    const result = await RedisClientApp.get(mockCacheName, mockCacheKey);
    expect(result).toBeNull();
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('Error getting cache:'));
    consoleSpy.mockRestore();
  })
});
