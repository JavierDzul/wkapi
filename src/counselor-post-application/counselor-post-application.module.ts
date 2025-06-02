import { Module } from '@nestjs/common';
import { CounselorPostApplicationService } from './counselor-post-application.service';
import { CounselorPostApplicationController } from './counselor-post-application.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CounselorPostApplicationController],
  providers: [CounselorPostApplicationService],
})
export class CounselorPostApplicationModule {}
