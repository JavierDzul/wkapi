import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { BookingStatus } from '@prisma/client';

export class CreateBookingDto {
  @IsString()
  studentId: string;

  @IsString()
  counselorId: string;

  @IsDateString()
  date: string; // YYYY-MM-DD

  @IsString()
  startTime: string; // HH:mm

  @IsString()
  endTime: string; // HH:mm

  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;
}
