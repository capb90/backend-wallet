/*
  Warnings:

  - You are about to drop the `account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `authenticator` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `verification_token` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[authProviderId]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "account" DROP CONSTRAINT "account_user_id_fkey";

-- DropForeignKey
ALTER TABLE "authenticator" DROP CONSTRAINT "authenticator_user_id_fkey";

-- DropForeignKey
ALTER TABLE "session" DROP CONSTRAINT "session_user_id_fkey";

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "authProviderId" TEXT,
ADD COLUMN     "auth_type" "auth_type" NOT NULL DEFAULT 'LOCAL';

-- DropTable
DROP TABLE "account";

-- DropTable
DROP TABLE "authenticator";

-- DropTable
DROP TABLE "session";

-- DropTable
DROP TABLE "verification_token";

-- CreateIndex
CREATE UNIQUE INDEX "user_authProviderId_key" ON "user"("authProviderId");
