import { IsEnum, IsNotEmpty, IsUUID, IsDateString } from 'class-validator';
import { weekday } from 'generated/prisma';

export class CreateAvailabilityDto {
  @IsUUID()
  @IsNotEmpty()
  counselorId: string;

  @IsEnum(weekday)
  @IsNotEmpty()
  weekday: weekday;

  @IsDateString()
  @IsNotEmpty()
  startTime: string;

  @IsDateString()
  @IsNotEmpty()
  endTime: string;
}
