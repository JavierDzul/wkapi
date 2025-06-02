import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStudentPostDto } from './dto/create-student-post.dto';
import { UpdateStudentPostDto } from './dto/update-student-post.dto';

@Injectable()
export class StudentPostService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateStudentPostDto) {
    return this.prisma.studentPost.create({ data });
  }

  findAll() {
    return this.prisma.studentPost.findMany();
  }

  findOne(postId: string) {
    return this.prisma.studentPost.findUnique({
      where: { postId },
    });
  }

  update(postId: string, data: UpdateStudentPostDto) {
    return this.prisma.studentPost.update({
      where: { postId },
      data,
    });
  }

  remove(postId: string) {
    return this.prisma.studentPost.delete({
      where: { postId },
    });
  }
}
