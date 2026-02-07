-- CreateTable
CREATE TABLE "Drop" (
    "senderId" INTEGER NOT NULL,
    "receiverId" INTEGER NOT NULL,
    "sentAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dropText" TEXT NOT NULL,

    CONSTRAINT "Drop_pkey" PRIMARY KEY ("senderId","receiverId","sentAt")
);

-- CreateIndex
CREATE INDEX "Drop_senderId_idx" ON "Drop"("senderId");

-- CreateIndex
CREATE INDEX "Drop_receiverId_idx" ON "Drop"("receiverId");
