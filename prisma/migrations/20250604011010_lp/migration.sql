-- AlterTable
ALTER TABLE "Counselor" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "certifications" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "education" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "experience" TEXT,
ADD COLUMN     "languages" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "rating" DOUBLE PRECISION,
ADD COLUMN     "sessionPrice" DOUBLE PRECISION,
ADD COLUMN     "totalReviews" INTEGER;
