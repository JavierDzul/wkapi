import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCounselorDto } from './dto/create-counselor.dto';
import { UpdateCounselorDto } from './dto/update-counselor.dto';

@Injectable()
export class CounselorService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateCounselorDto) {
    return this.prisma.counselor.create({ data });
  }

  findAll() {
    return this.prisma.counselor.findMany({ include: { user: true } });
  }

  findOne(counselorId: string) {
    return this.prisma.counselor.findUnique({ where: { counselorId }, include: { user: true } });
  }

  update(counselorId: string, data: UpdateCounselorDto) {
    return this.prisma.counselor.update({ where: { counselorId }, data });
  }

  remove(counselorId: string) {
    return this.prisma.counselor.delete({ where: { counselorId } });
  }
}
