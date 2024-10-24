/*
  Warnings:

  - You are about to drop the column `addressId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `personalInfoId` on the `users` table. All the data in the column will be lost.
  - Added the required column `address_id` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `personal_info_id` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `setting_id` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "staff"."Theme" AS ENUM ('LIGHT', 'DARK');

-- CreateEnum
CREATE TYPE "staff"."Language" AS ENUM ('EN', 'PL');

-- DropForeignKey
ALTER TABLE "staff"."users" DROP CONSTRAINT "users_addressId_fkey";

-- DropForeignKey
ALTER TABLE "staff"."users" DROP CONSTRAINT "users_personalInfoId_fkey";

-- AlterTable
ALTER TABLE "staff"."users" DROP COLUMN "addressId",
DROP COLUMN "personalInfoId",
ADD COLUMN     "address_id" INTEGER NOT NULL,
ADD COLUMN     "personal_info_id" INTEGER NOT NULL,
ADD COLUMN     "setting_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "staff"."settings" (
    "setting_id" SERIAL NOT NULL,
    "theme" "staff"."Theme" NOT NULL DEFAULT 'LIGHT',
    "language" "staff"."Language" NOT NULL DEFAULT 'EN',

    CONSTRAINT "settings_pkey" PRIMARY KEY ("setting_id")
);

-- AddForeignKey
ALTER TABLE "staff"."users" ADD CONSTRAINT "users_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "staff"."addresses"("address_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staff"."users" ADD CONSTRAINT "users_personal_info_id_fkey" FOREIGN KEY ("personal_info_id") REFERENCES "staff"."personal_infos"("personal_info_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "staff"."users" ADD CONSTRAINT "users_setting_id_fkey" FOREIGN KEY ("setting_id") REFERENCES "staff"."settings"("setting_id") ON DELETE CASCADE ON UPDATE CASCADE;
