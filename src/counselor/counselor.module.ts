import { Module } from '@nestjs/common';
import { CounselorService } from './counselor.service';
import { CounselorController } from './counselor.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CounselorController],
  providers: [CounselorService],
})
export class CounselorModule {}
