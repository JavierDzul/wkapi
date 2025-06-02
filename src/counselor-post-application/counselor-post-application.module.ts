import { Module } from '@nestjs/common';
import { CounselorPostApplicationService } from './counselor-post-application.service';
import { CounselorPostApplicationController } from './counselor-post-application.controller';

@Module({
  controllers: [CounselorPostApplicationController],
  providers: [CounselorPostApplicationService],
})
export class CounselorPostApplicationModule {}
