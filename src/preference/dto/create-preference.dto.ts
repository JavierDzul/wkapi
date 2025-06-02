import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreatePreferenceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsUUID()
  @IsOptional()
  fatherPreferenceId?: string;
}
