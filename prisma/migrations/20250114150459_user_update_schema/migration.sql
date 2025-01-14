/*
  Warnings:

  - The primary key for the `authenticator` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `full_name` on the `user` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "account" DROP CONSTRAINT "account_user_id_fkey";

-- DropForeignKey
ALTER TABLE "authenticator" DROP CONSTRAINT "authenticator_user_id_fkey";

-- DropForeignKey
ALTER TABLE "expense" DROP CONSTRAINT "expense_user_id_fkey";

-- DropForeignKey
ALTER TABLE "income" DROP CONSTRAINT "income_user_id_fkey";

-- DropForeignKey
ALTER TABLE "loan" DROP CONSTRAINT "loan_user_id_fkey";

-- DropForeignKey
ALTER TABLE "notification" DROP CONSTRAINT "notification_user_id_fkey";

-- DropForeignKey
ALTER TABLE "report" DROP CONSTRAINT "report_update_by_id_fkey";

-- DropForeignKey
ALTER TABLE "report" DROP CONSTRAINT "report_user_id_fkey";

-- DropForeignKey
ALTER TABLE "report_attachment" DROP CONSTRAINT "report_attachment_uploaded_by_fkey";

-- DropForeignKey
ALTER TABLE "report_expense" DROP CONSTRAINT "report_expense_update_by_id_fkey";

-- DropForeignKey
ALTER TABLE "report_expense" DROP CONSTRAINT "report_expense_user_id_fkey";

-- DropForeignKey
ALTER TABLE "report_expense_comment" DROP CONSTRAINT "report_expense_comment_user_id_fkey";

-- DropForeignKey
ALTER TABLE "report_income" DROP CONSTRAINT "report_income_update_by_id_fkey";

-- DropForeignKey
ALTER TABLE "report_income" DROP CONSTRAINT "report_income_user_id_fkey";

-- DropForeignKey
ALTER TABLE "report_income_comment" DROP CONSTRAINT "report_income_comment_user_id_fkey";

-- DropForeignKey
ALTER TABLE "saving" DROP CONSTRAINT "saving_user_id_fkey";

-- DropForeignKey
ALTER TABLE "session" DROP CONSTRAINT "session_user_id_fkey";

-- DropForeignKey
ALTER TABLE "shared_report" DROP CONSTRAINT "shared_report_user_id_fkey";

-- AlterTable
ALTER TABLE "account" ALTER COLUMN "user_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "authenticator" DROP CONSTRAINT "authenticator_pkey",
ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "authenticator_pkey" PRIMARY KEY ("user_id", "credential_id");

-- AlterTable
ALTER TABLE "expense" ALTER COLUMN "user_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "income" ALTER COLUMN "user_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "loan" ALTER COLUMN "user_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "notification" ALTER COLUMN "user_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "report" ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ALTER COLUMN "update_by_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "report_attachment" ALTER COLUMN "uploaded_by" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "report_expense" ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ALTER COLUMN "update_by_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "report_expense_comment" ALTER COLUMN "user_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "report_income" ALTER COLUMN "user_id" SET DATA TYPE TEXT,
ALTER COLUMN "update_by_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "report_income_comment" ALTER COLUMN "user_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "saving" ALTER COLUMN "user_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "session" ALTER COLUMN "user_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "shared_report" ALTER COLUMN "user_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "user" DROP CONSTRAINT "user_pkey",
DROP COLUMN "full_name",
ADD COLUMN     "emailVerified" TIMESTAMP(3),
ADD COLUMN     "name" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "user_id_seq";

-- AddForeignKey
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "authenticator" ADD CONSTRAINT "authenticator_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report" ADD CONSTRAINT "report_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report" ADD CONSTRAINT "report_update_by_id_fkey" FOREIGN KEY ("update_by_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shared_report" ADD CONSTRAINT "shared_report_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense" ADD CONSTRAINT "expense_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "income" ADD CONSTRAINT "income_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_expense" ADD CONSTRAINT "report_expense_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_expense" ADD CONSTRAINT "report_expense_update_by_id_fkey" FOREIGN KEY ("update_by_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_expense_comment" ADD CONSTRAINT "report_expense_comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_income" ADD CONSTRAINT "report_income_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_income" ADD CONSTRAINT "report_income_update_by_id_fkey" FOREIGN KEY ("update_by_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_income_comment" ADD CONSTRAINT "report_income_comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_attachment" ADD CONSTRAINT "report_attachment_uploaded_by_fkey" FOREIGN KEY ("uploaded_by") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loan" ADD CONSTRAINT "loan_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saving" ADD CONSTRAINT "saving_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
