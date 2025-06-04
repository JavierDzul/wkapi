import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateCounselorDto {
  @IsUUID()
  @IsNotEmpty()
  userID: string;
  experience: string;
  sessionPrice: number;
  rating: number;
  totalReviews: number;
  bio: string;
  education: never[];
  certifications: never[];
  languages: string[];
}
