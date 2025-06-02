import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCounselorPostApplicationDto } from './dto/create-counselor-post-application.dto';
import { UpdateCounselorPostApplicationDto } from './dto/update-counselor-post-application.dto';

@Injectable()
export class CounselorPostApplicationService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateCounselorPostApplicationDto) {
    return this.prisma.counselor_Post_Application.create({ data });
  }

  findAll() {
    return this.prisma.counselor_Post_Application.findMany();
  }

  findOne(applicationId: string) {
    return this.prisma.counselor_Post_Application.findUnique({
      where: { applicationId },
    });
  }

  update(applicationId: string, data: UpdateCounselorPostApplicationDto) {
    return this.prisma.counselor_Post_Application.update({
      where: { applicationId },
      data,
    });
  }

  remove(applicationId: string) {
    return this.prisma.counselor_Post_Application.delete({
      where: { applicationId },
    });
  }
}
