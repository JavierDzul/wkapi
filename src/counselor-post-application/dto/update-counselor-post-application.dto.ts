import { PartialType } from '@nestjs/mapped-types';
import { CreateCounselorPostApplicationDto } from './create-counselor-post-application.dto';

export class UpdateCounselorPostApplicationDto extends PartialType(CreateCounselorPostApplicationDto) {}
