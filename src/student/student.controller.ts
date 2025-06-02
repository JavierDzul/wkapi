import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @Get(':studentId')
  findOne(@Param('studentId') studentId: string) {
    return this.studentService.findOne(studentId);
  }

  @Patch(':studentId')
  update(@Param('studentId') studentId: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(studentId, updateStudentDto);
  }

  @Delete(':studentId')
  remove(@Param('studentId') studentId: string) {
    return this.studentService.remove(studentId);
  }
}
