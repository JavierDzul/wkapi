import { IsEnum, IsNotEmpty, IsUUID, IsDateString } from 'class-validator';
import { BookingStatus } from '@prisma/client';

export class CreateBookingDto {
  @IsUUID()
  @IsNotEmpty()
  studentId: string;

  @IsUUID()
  @IsNotEmpty()
  counselorId: string;

  @IsEnum(BookingStatus)
  status: BookingStatus;

  @IsDateString()
  date: string;

  @IsDateString()
  startTime: string;

  @IsDateString()
  endTime: string;
}
