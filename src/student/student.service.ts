import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateStudentDto) {
    return this.prisma.student.create({ data });
  }

  findAll() {
    return this.prisma.student.findMany({ include: { user: true } });
  }

  findOne(studentId: string) {
    return this.prisma.student.findUnique({ where: { studentId }, include: { user: true } });
  }

  update(studentId: string, data: UpdateStudentDto) {
    return this.prisma.student.update({ where: { studentId }, data });
  }

  remove(studentId: string) {
    return this.prisma.student.delete({ where: { studentId } });
  }
}
