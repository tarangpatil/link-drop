/*
  Warnings:

  - You are about to drop the `Drop` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Drop" DROP CONSTRAINT "Drop_userAId_fkey";

-- DropForeignKey
ALTER TABLE "Drop" DROP CONSTRAINT "Drop_userBId_fkey";

-- DropTable
DROP TABLE "Drop";

-- CreateTable
CREATE TABLE "DropChat" (
    "userAId" INTEGER NOT NULL,
    "userBId" INTEGER NOT NULL,

    CONSTRAINT "DropChat_pkey" PRIMARY KEY ("userAId","userBId")
);

-- AddForeignKey
ALTER TABLE "DropChat" ADD CONSTRAINT "DropChat_userAId_fkey" FOREIGN KEY ("userAId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DropChat" ADD CONSTRAINT "DropChat_userBId_fkey" FOREIGN KEY ("userBId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
