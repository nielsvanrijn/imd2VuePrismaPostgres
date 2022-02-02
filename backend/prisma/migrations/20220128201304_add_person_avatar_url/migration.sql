/*
  Warnings:

  - Added the required column `avatarUrl` to the `Person` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Person" ADD COLUMN     "avatarUrl" TEXT NOT NULL;
