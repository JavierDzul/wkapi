import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentPostDto } from './create-student-post.dto';

export class UpdateStudentPostDto extends PartialType(CreateStudentPostDto) {}
