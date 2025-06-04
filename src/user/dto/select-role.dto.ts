// dto/set-role-and-preferences.dto.ts
import { IsArray, IsEnum, IsString, ArrayNotEmpty, IsUUID } from 'class-validator';
import { Role } from '@prisma/client';

export class SetRoleAndPreferencesDto {
  @IsEnum(Role)
  role: Role;

  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('all', { each: true })
  preferences: string[]; // UUIDs of the selected preferences
}