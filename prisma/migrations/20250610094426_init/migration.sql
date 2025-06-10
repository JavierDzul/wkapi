-- CreateEnum
CREATE TYPE "Role" AS ENUM ('student', 'counselor', 'admin', 'user');

-- CreateTable
CREATE TABLE "Publisher" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "apiKey" TEXT NOT NULL,
    "scriptEndpoint" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Publisher_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "publisherId" TEXT NOT NULL,
    "hubspotUtk" TEXT,
    "pageUrl" TEXT NOT NULL,
    "pageTitle" TEXT NOT NULL,
    "referrer" TEXT,
    "snippet" TEXT,
    "utmSource" TEXT,
    "utmMedium" TEXT,
    "utmCampaign" TEXT,
    "utmTerm" TEXT,
    "utmContent" TEXT,
    "userAgent" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "screenWidth" INTEGER NOT NULL,
    "screenHeight" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "source" TEXT,

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CampaignSource" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CampaignSource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conversion" (
    "id" SERIAL NOT NULL,
    "leadId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "value" DOUBLE PRECISION,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Conversion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubmissionLog" (
    "id" SERIAL NOT NULL,
    "leadId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "responseCode" INTEGER,
    "responseBody" JSONB,
    "attemptedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SubmissionLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Publisher_apiKey_key" ON "Publisher"("apiKey");

-- CreateIndex
CREATE UNIQUE INDEX "Publisher_scriptEndpoint_key" ON "Publisher"("scriptEndpoint");

-- CreateIndex
CREATE UNIQUE INDEX "CampaignSource_code_key" ON "CampaignSource"("code");

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_publisherId_fkey" FOREIGN KEY ("publisherId") REFERENCES "Publisher"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lead" ADD CONSTRAINT "Lead_source_fkey" FOREIGN KEY ("source") REFERENCES "CampaignSource"("code") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Conversion" ADD CONSTRAINT "Conversion_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubmissionLog" ADD CONSTRAINT "SubmissionLog_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Lead"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
