import { ApplicationStatus } from "@prisma/client";

export class CounselorPostApplication {
  applicationId: string;
  postId: string;
  counselorId: string;
  status: ApplicationStatus;
  createdAt: Date;
  updatedAt: Date;
}
