import { Module } from '@nestjs/common';
import { CounselorService } from './counselor.service';
import { CounselorController } from './counselor.controller';

@Module({
  controllers: [CounselorController],
  providers: [CounselorService],
})
export class CounselorModule {}
