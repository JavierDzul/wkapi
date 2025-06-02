import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateStudentDto {
  @IsUUID()
  @IsNotEmpty()
  userID: string;
}
