import { createClient, RedisClientType } from 'redis';

export class RedisClientApp {
  private static _client: RedisClientType = createClient();

  public static get client() {
    return this._client;
  }

  public static async connect() {
    try {
      await this._client.connect();
    } catch (error) {
      console.error('Redis connect error', error);
      process.exit(1);
    }
  }
}
