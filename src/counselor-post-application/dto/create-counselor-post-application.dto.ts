import { IsEnum, IsNotEmpty, IsOptional, IsUUID } from 'class-validator';
import { ApplicationStatus } from '@prisma/client';

export class CreateCounselorPostApplicationDto {
  @IsUUID()
  @IsNotEmpty()
  postId: string;

  @IsUUID()
  @IsNotEmpty()
  counselorId: string;

  @IsOptional()
  @IsEnum(ApplicationStatus)
  status?: ApplicationStatus;
}
