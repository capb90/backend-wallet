-- CreateEnum
CREATE TYPE "report_status" AS ENUM ('CREATED', 'FINISHED', 'CLOSED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "type_payment" AS ENUM ('TIME_LESS', 'QUOTA_LESS');

-- CreateEnum
CREATE TYPE "loan_status" AS ENUM ('ACTIVE', 'PAID', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "auth_type" AS ENUM ('LOCAL', 'GOOGLE');

-- CreateEnum
CREATE TYPE "user_status" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "attachment_entity" AS ENUM ('EXPENSE', 'INCOME');

-- CreateEnum
CREATE TYPE "notification_status" AS ENUM ('SENT', 'READ');

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "full_name" VARCHAR(256) NOT NULL,
    "email" TEXT NOT NULL,
    "verify_email" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT,
    "auth_provider" "auth_type" NOT NULL DEFAULT 'LOCAL',
    "auth_provider_id" TEXT,
    "status" "user_status" NOT NULL DEFAULT 'ACTIVE',
    "last_login" TIMESTAMP,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notification" (
    "id" SERIAL NOT NULL,
    "message" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "status" "notification_status" NOT NULL DEFAULT 'SENT',
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "start_date" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finish_date" DATE,
    "status" "report_status" NOT NULL DEFAULT 'CREATED',
    "user_id" INTEGER NOT NULL,
    "update_by_id" INTEGER,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report_property" (
    "id" SERIAL NOT NULL,
    "report_id" INTEGER NOT NULL,
    "goal_expenses" DECIMAL(65,30) NOT NULL,
    "goal_income" DECIMAL(65,30),
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "report_property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shared_report" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "report_id" INTEGER NOT NULL,
    "permission_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "shared_report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permission_report" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "permission_report_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "expense" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "description" TEXT,
    "user_id" INTEGER NOT NULL,
    "category_id" INTEGER,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "amount" DECIMAL(15,2) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "income" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "description" TEXT,
    "amount" DECIMAL(15,2) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "income_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report_expense" (
    "id" SERIAL NOT NULL,
    "report_id" INTEGER NOT NULL,
    "reported_date" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name_expense" VARCHAR(256) NOT NULL,
    "expense_amount" DECIMAL(15,2) NOT NULL,
    "parent_expense_id" INTEGER,
    "user_id" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "update_by_id" INTEGER,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "report_expense_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report_expense_property" (
    "id" SERIAL NOT NULL,
    "category_id" INTEGER,
    "report_expense_id" INTEGER NOT NULL,
    "description" TEXT,

    CONSTRAINT "report_expense_property_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report_expense_comment" (
    "id" SERIAL NOT NULL,
    "report_expense_id" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "parent_comment_id" INTEGER,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "report_expense_comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report_income" (
    "id" SERIAL NOT NULL,
    "report_id" INTEGER NOT NULL,
    "reported_date" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name_income" VARCHAR(256) NOT NULL,
    "income_amount" DECIMAL(15,2) NOT NULL,
    "parent_income_id" INTEGER,
    "user_id" INTEGER NOT NULL,
    "description" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "update_by_id" INTEGER,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "report_income_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report_income_comment" (
    "id" SERIAL NOT NULL,
    "report_income_id" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "parent_comment_id" INTEGER,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "report_income_comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report_attachment" (
    "id" SERIAL NOT NULL,
    "report_id" INTEGER NOT NULL,
    "url" VARCHAR(512) NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "uploaded_by" INTEGER NOT NULL,
    "related_entity" "attachment_entity" NOT NULL,
    "related_entity_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "report_attachment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "loan" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "amount" DECIMAL(15,2) NOT NULL,
    "interest_rate" DECIMAL(5,2) NOT NULL,
    "term_months" INTEGER NOT NULL,
    "start_date" DATE NOT NULL,
    "status" "loan_status" NOT NULL DEFAULT 'ACTIVE',
    "remaining_balance" DECIMAL(15,2) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "loan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "extra_payment_loan" (
    "id" SERIAL NOT NULL,
    "loan_id" INTEGER NOT NULL,
    "payment_date" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" DECIMAL(15,2) NOT NULL,
    "payment_type" "type_payment" NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "extra_payment_loan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "monthly_payment_loan" (
    "id" SERIAL NOT NULL,
    "loan_id" INTEGER NOT NULL,
    "payment_date" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "amount" DECIMAL(15,2) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "monthly_payment_loan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "saving" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "goal" DECIMAL(15,2),
    "amount" DECIMAL(15,2) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "saving_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "history_saving" (
    "id" SERIAL NOT NULL,
    "saving_id" INTEGER NOT NULL,
    "amount" DECIMAL(15,2) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP,

    CONSTRAINT "history_saving_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "notification_id_key" ON "notification"("id");

-- CreateIndex
CREATE UNIQUE INDEX "report_id_key" ON "report"("id");

-- CreateIndex
CREATE UNIQUE INDEX "report_name_user_id_start_date_finish_date_key" ON "report"("name", "user_id", "start_date", "finish_date");

-- CreateIndex
CREATE UNIQUE INDEX "report_property_id_key" ON "report_property"("id");

-- CreateIndex
CREATE UNIQUE INDEX "report_property_report_id_key" ON "report_property"("report_id");

-- CreateIndex
CREATE UNIQUE INDEX "category_id_key" ON "category"("id");

-- CreateIndex
CREATE UNIQUE INDEX "shared_report_id_key" ON "shared_report"("id");

-- CreateIndex
CREATE INDEX "shared_report_user_id_idx" ON "shared_report"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "shared_report_user_id_report_id_key" ON "shared_report"("user_id", "report_id");

-- CreateIndex
CREATE UNIQUE INDEX "permission_report_id_key" ON "permission_report"("id");

-- CreateIndex
CREATE UNIQUE INDEX "permission_report_name_key" ON "permission_report"("name");

-- CreateIndex
CREATE UNIQUE INDEX "expense_id_key" ON "expense"("id");

-- CreateIndex
CREATE UNIQUE INDEX "expense_name_user_id_key" ON "expense"("name", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "income_id_key" ON "income"("id");

-- CreateIndex
CREATE UNIQUE INDEX "income_name_user_id_key" ON "income"("name", "user_id");

-- CreateIndex
CREATE UNIQUE INDEX "report_expense_id_key" ON "report_expense"("id");

-- CreateIndex
CREATE INDEX "report_expense_report_id_reported_date_idx" ON "report_expense"("report_id", "reported_date");

-- CreateIndex
CREATE UNIQUE INDEX "report_expense_property_id_key" ON "report_expense_property"("id");

-- CreateIndex
CREATE UNIQUE INDEX "report_expense_property_report_expense_id_key" ON "report_expense_property"("report_expense_id");

-- CreateIndex
CREATE UNIQUE INDEX "report_expense_comment_id_key" ON "report_expense_comment"("id");

-- CreateIndex
CREATE INDEX "report_expense_comment_report_expense_id_parent_comment_id_idx" ON "report_expense_comment"("report_expense_id", "parent_comment_id");

-- CreateIndex
CREATE UNIQUE INDEX "report_income_id_key" ON "report_income"("id");

-- CreateIndex
CREATE INDEX "report_income_report_id_reported_date_idx" ON "report_income"("report_id", "reported_date");

-- CreateIndex
CREATE UNIQUE INDEX "report_income_comment_id_key" ON "report_income_comment"("id");

-- CreateIndex
CREATE INDEX "report_income_comment_report_income_id_parent_comment_id_idx" ON "report_income_comment"("report_income_id", "parent_comment_id");

-- CreateIndex
CREATE UNIQUE INDEX "report_attachment_id_key" ON "report_attachment"("id");

-- CreateIndex
CREATE UNIQUE INDEX "loan_id_key" ON "loan"("id");

-- CreateIndex
CREATE INDEX "loan_user_id_idx" ON "loan"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "extra_payment_loan_id_key" ON "extra_payment_loan"("id");

-- CreateIndex
CREATE UNIQUE INDEX "monthly_payment_loan_id_key" ON "monthly_payment_loan"("id");

-- CreateIndex
CREATE UNIQUE INDEX "saving_id_key" ON "saving"("id");

-- CreateIndex
CREATE INDEX "saving_user_id_idx" ON "saving"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "history_saving_id_key" ON "history_saving"("id");

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report" ADD CONSTRAINT "report_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report" ADD CONSTRAINT "report_update_by_id_fkey" FOREIGN KEY ("update_by_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_property" ADD CONSTRAINT "report_property_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "report"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shared_report" ADD CONSTRAINT "shared_report_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shared_report" ADD CONSTRAINT "shared_report_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "report"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shared_report" ADD CONSTRAINT "shared_report_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permission_report"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense" ADD CONSTRAINT "expense_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expense" ADD CONSTRAINT "expense_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "income" ADD CONSTRAINT "income_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_expense" ADD CONSTRAINT "report_expense_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "report"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_expense" ADD CONSTRAINT "report_expense_parent_expense_id_fkey" FOREIGN KEY ("parent_expense_id") REFERENCES "expense"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "report_expense" ADD CONSTRAINT "report_expense_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_expense" ADD CONSTRAINT "report_expense_update_by_id_fkey" FOREIGN KEY ("update_by_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_expense_property" ADD CONSTRAINT "report_expense_property_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_expense_property" ADD CONSTRAINT "report_expense_property_report_expense_id_fkey" FOREIGN KEY ("report_expense_id") REFERENCES "report_expense"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_expense_comment" ADD CONSTRAINT "report_expense_comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_expense_comment" ADD CONSTRAINT "report_expense_comment_report_expense_id_fkey" FOREIGN KEY ("report_expense_id") REFERENCES "report_expense"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_expense_comment" ADD CONSTRAINT "report_expense_comment_parent_comment_id_fkey" FOREIGN KEY ("parent_comment_id") REFERENCES "report_expense_comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_income" ADD CONSTRAINT "report_income_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "report"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_income" ADD CONSTRAINT "report_income_parent_income_id_fkey" FOREIGN KEY ("parent_income_id") REFERENCES "income"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "report_income" ADD CONSTRAINT "report_income_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_income" ADD CONSTRAINT "report_income_update_by_id_fkey" FOREIGN KEY ("update_by_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_income_comment" ADD CONSTRAINT "report_income_comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_income_comment" ADD CONSTRAINT "report_income_comment_report_income_id_fkey" FOREIGN KEY ("report_income_id") REFERENCES "report_income"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_income_comment" ADD CONSTRAINT "report_income_comment_parent_comment_id_fkey" FOREIGN KEY ("parent_comment_id") REFERENCES "report_income_comment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_attachment" ADD CONSTRAINT "report_attachment_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "report"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_attachment" ADD CONSTRAINT "report_attachment_uploaded_by_fkey" FOREIGN KEY ("uploaded_by") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "loan" ADD CONSTRAINT "loan_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "extra_payment_loan" ADD CONSTRAINT "extra_payment_loan_loan_id_fkey" FOREIGN KEY ("loan_id") REFERENCES "loan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monthly_payment_loan" ADD CONSTRAINT "monthly_payment_loan_loan_id_fkey" FOREIGN KEY ("loan_id") REFERENCES "loan"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "saving" ADD CONSTRAINT "saving_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "history_saving" ADD CONSTRAINT "history_saving_saving_id_fkey" FOREIGN KEY ("saving_id") REFERENCES "saving"("id") ON DELETE CASCADE ON UPDATE CASCADE;
