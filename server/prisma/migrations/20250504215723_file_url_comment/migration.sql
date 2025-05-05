-- CreateEnum
CREATE TYPE "FileType" AS ENUM ('IMAGE', 'TEXT');

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "fileType" "FileType",
ADD COLUMN     "fileUrl" TEXT;
