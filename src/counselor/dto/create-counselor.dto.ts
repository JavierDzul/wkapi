import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateCounselorDto {
  @IsUUID()
  @IsNotEmpty()
  userID: string;
}
