/* eslint-disable @typescript-eslint/no-empty-function */
import { PrismaClient } from '@prisma/client';

export class PrismaClientApp {
  private static instance: PrismaClient;

  private constructor() {}

  public static getInstance(): PrismaClient {
    if (!PrismaClientApp.instance) {
      PrismaClientApp.instance = new PrismaClient();
    }

    return PrismaClientApp.instance;
  }
}
