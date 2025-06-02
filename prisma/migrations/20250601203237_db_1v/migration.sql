-- CreateEnum
CREATE TYPE "weekday" AS ENUM ('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday');

-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('booked', 'cancelled', 'completed');

-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('receiving', 'closed', 'booked', 'archived');

-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('pending', 'accepted', 'rejected');

-- CreateTable
CREATE TABLE "Student" (
    "studentId" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("studentId")
);

-- CreateTable
CREATE TABLE "Counselor" (
    "counselorId" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Counselor_pkey" PRIMARY KEY ("counselorId")
);

-- CreateTable
CREATE TABLE "Preference" (
    "preferenceId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "fatherPreferenceId" TEXT,

    CONSTRAINT "Preference_pkey" PRIMARY KEY ("preferenceId")
);

-- CreateTable
CREATE TABLE "availability" (
    "availabilityId" TEXT NOT NULL,
    "counselorId" TEXT NOT NULL,
    "weekday" "weekday" NOT NULL,
    "startTime" TIME NOT NULL,
    "endTime" TIME NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "availability_pkey" PRIMARY KEY ("availabilityId")
);

-- CreateTable
CREATE TABLE "booking" (
    "bookingId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "counselorId" TEXT NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'booked',
    "date" DATE NOT NULL,
    "startTime" TIME NOT NULL,
    "endTime" TIME NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "booking_pkey" PRIMARY KEY ("bookingId")
);

-- CreateTable
CREATE TABLE "StudentPost" (
    "postId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "content" TEXT,
    "date" DATE NOT NULL,
    "startTime" TIME NOT NULL,
    "endTime" TIME NOT NULL,
    "closedDate" TIMESTAMP NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentPost_pkey" PRIMARY KEY ("postId")
);

-- CreateTable
CREATE TABLE "Counselor_Post_Application" (
    "applicationId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "counselorId" TEXT NOT NULL,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Counselor_Post_Application_pkey" PRIMARY KEY ("applicationId")
);

-- CreateTable
CREATE TABLE "_CounselorToPreference" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_CounselorToPreference_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_PreferenceToStudent" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_PreferenceToStudent_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_userID_key" ON "Student"("userID");

-- CreateIndex
CREATE UNIQUE INDEX "Counselor_userID_key" ON "Counselor"("userID");

-- CreateIndex
CREATE UNIQUE INDEX "Preference_name_key" ON "Preference"("name");

-- CreateIndex
CREATE INDEX "_CounselorToPreference_B_index" ON "_CounselorToPreference"("B");

-- CreateIndex
CREATE INDEX "_PreferenceToStudent_B_index" ON "_PreferenceToStudent"("B");

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Counselor" ADD CONSTRAINT "Counselor_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Preference" ADD CONSTRAINT "Preference_fatherPreferenceId_fkey" FOREIGN KEY ("fatherPreferenceId") REFERENCES "Preference"("preferenceId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "availability" ADD CONSTRAINT "availability_counselorId_fkey" FOREIGN KEY ("counselorId") REFERENCES "Counselor"("counselorId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_counselorId_fkey" FOREIGN KEY ("counselorId") REFERENCES "Counselor"("counselorId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentPost" ADD CONSTRAINT "StudentPost_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("studentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Counselor_Post_Application" ADD CONSTRAINT "Counselor_Post_Application_postId_fkey" FOREIGN KEY ("postId") REFERENCES "StudentPost"("postId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Counselor_Post_Application" ADD CONSTRAINT "Counselor_Post_Application_counselorId_fkey" FOREIGN KEY ("counselorId") REFERENCES "Counselor"("counselorId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CounselorToPreference" ADD CONSTRAINT "_CounselorToPreference_A_fkey" FOREIGN KEY ("A") REFERENCES "Counselor"("counselorId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CounselorToPreference" ADD CONSTRAINT "_CounselorToPreference_B_fkey" FOREIGN KEY ("B") REFERENCES "Preference"("preferenceId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PreferenceToStudent" ADD CONSTRAINT "_PreferenceToStudent_A_fkey" FOREIGN KEY ("A") REFERENCES "Preference"("preferenceId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PreferenceToStudent" ADD CONSTRAINT "_PreferenceToStudent_B_fkey" FOREIGN KEY ("B") REFERENCES "Student"("studentId") ON DELETE CASCADE ON UPDATE CASCADE;
