import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StudentPostService } from './student-post.service';
import { CreateStudentPostDto } from './dto/create-student-post.dto';
import { UpdateStudentPostDto } from './dto/update-student-post.dto';

@Controller('student-post')
export class StudentPostController {
  constructor(private readonly studentPostService: StudentPostService) {}

  @Post()
  create(@Body() dto: CreateStudentPostDto) {
    return this.studentPostService.create(dto);
  }

  @Get()
  findAll() {
    return this.studentPostService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentPostService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateStudentPostDto) {
    return this.studentPostService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentPostService.remove(id);
  }
}
