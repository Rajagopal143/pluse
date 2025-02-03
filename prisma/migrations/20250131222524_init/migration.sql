/*
  Warnings:

  - You are about to drop the `accounts` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sessions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_user_id_fkey";

-- DropForeignKey
ALTER TABLE "sessions" DROP CONSTRAINT "sessions_user_id_fkey";

-- DropTable
DROP TABLE "accounts";

-- DropTable
DROP TABLE "sessions";

-- DropTable
DROP TABLE "users";

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Voucher" (
    "VoucherNo" TEXT NOT NULL,
    "VoucherDate" TIMESTAMP(3) NOT NULL,
    "VoucherRefNo" TEXT NOT NULL,
    "VoucherNarration" TEXT NOT NULL,
    "VoucherEnteredBy" TEXT NOT NULL,
    "VoucherEnteredOn" TIMESTAMP(3) NOT NULL,
    "VoucherVerifiedBy" TEXT,
    "VoucherVerifiedOn" TIMESTAMP(3),
    "VoucherApprovedBy" TEXT,
    "VoucherApprovedOn" TIMESTAMP(3),
    "VoucherEntryNo" INTEGER NOT NULL,
    "AccountHead" TEXT NOT NULL,
    "AccountHeadName" TEXT NOT NULL,
    "DrCr" TEXT NOT NULL,
    "DrAmount" DOUBLE PRECISION NOT NULL,
    "CrAmount" DOUBLE PRECISION NOT NULL,
    "VoucherAmountFormatted" DOUBLE PRECISION NOT NULL,
    "EntryNarration" TEXT NOT NULL,
    "AccountGroup" TEXT NOT NULL,
    "MasterGroup" TEXT NOT NULL,
    "VoucherType" TEXT NOT NULL,
    "SysRemarks" TEXT NOT NULL,
    "VoucherModifiedBy" TEXT,
    "VoucherModifiedOn" TIMESTAMP(3),
    "BillNo" TEXT,
    "BillDate" TIMESTAMP(3),
    "BillPaidTo" TEXT,
    "BillRemarks" TEXT,
    "VoucherEffectiveDate" TIMESTAMP(3) NOT NULL,
    "AccountHeadArabic" TEXT NOT NULL,
    "ReferenceNote" TEXT,

    CONSTRAINT "Voucher_pkey" PRIMARY KEY ("VoucherNo")
);

-- CreateTable
CREATE TABLE "Account" (
    "AccountId" TEXT NOT NULL,
    "MasterGroupId" TEXT NOT NULL,
    "MasterGroup" TEXT NOT NULL,
    "AccountGroup" TEXT NOT NULL,
    "AccountGroupId" TEXT NOT NULL,
    "AccountHead" TEXT NOT NULL,
    "AccountHeadArabic" TEXT,
    "ReferenceNo" TEXT,
    "IsLedgerObselete" BOOLEAN NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("AccountId")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
