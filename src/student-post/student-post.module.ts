import { Module } from '@nestjs/common';
import { StudentPostService } from './student-post.service';
import { StudentPostController } from './student-post.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [StudentPostController],
  providers: [StudentPostService],
})
export class StudentPostModule {}
