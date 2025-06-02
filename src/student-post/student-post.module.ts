import { Module } from '@nestjs/common';
import { StudentPostService } from './student-post.service';
import { StudentPostController } from './student-post.controller';

@Module({
  controllers: [StudentPostController],
  providers: [StudentPostService],
})
export class StudentPostModule {}
