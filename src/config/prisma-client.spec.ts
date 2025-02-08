import { PrismaClient } from "@prisma/client"
import { PrismaClientApp } from "./prisma-client";

describe("PrismaClientApp",()=>{
    let prisma:PrismaClient;

    beforeAll(()=>{
        prisma = PrismaClientApp.getInstance()
    });

    afterAll(async()=>{
        await prisma.$disconnect();
    })


    test("Should return prisma client instant",()=>{
        expect(prisma).toBeDefined();
        expect(prisma).toBeInstanceOf(PrismaClient);
    });

    test("Should connect and disconnect",async()=>{
        await expect(prisma.$connect()).resolves.not.toThrow();
        await expect(prisma.$disconnect()).resolves.not.toThrow();
    })
})