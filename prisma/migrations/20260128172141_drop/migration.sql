-- CreateTable
CREATE TABLE "Drop" (
    "userAId" INTEGER NOT NULL,
    "userBId" INTEGER NOT NULL,

    CONSTRAINT "Drop_pkey" PRIMARY KEY ("userAId","userBId")
);

-- AddForeignKey
ALTER TABLE "Drop" ADD CONSTRAINT "Drop_userAId_fkey" FOREIGN KEY ("userAId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Drop" ADD CONSTRAINT "Drop_userBId_fkey" FOREIGN KEY ("userBId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
