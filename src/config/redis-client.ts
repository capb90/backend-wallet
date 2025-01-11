import * as redis from 'redis';
import { envs } from './envs';

export class RedisClientApp {
  private static _client = redis.createClient({
    url: envs.REDIS_URL
  });

  constructor() {
    RedisClientApp._client.connect();
  }

  public static get client() {
    return this._client;
  }

  public static async get(cacheName: string, key: string) {
    try {
      const data = await RedisClientApp.client.json.get(`${cacheName}:${key}`);
      return data;
    } catch (error) {
      //TODO:log mange
      console.error(`Error getting cache:${error}`);
      return null;
    }
  }

  public static async set(
    cacheName: string,
    key: string,
    value: string,
    expiresIn?: number
  ) {
    try {
      const fullKey = `${cacheName}:${key}`;
      await RedisClientApp.client.json.set(fullKey, '.', value);

      if (expiresIn) {
        await RedisClientApp.client.expire(fullKey, expiresIn);
      }
    } catch (error) {
      console.error(`Error setting cache:${error}`);
    }
  }

  public static async remove(cacheName: string, key: string) {
    try {
      await RedisClientApp.client.del(`${cacheName}:${key}`);
    } catch (error) {
      console.error(`Error deleting cache:${error}`);
    }
  }
}
