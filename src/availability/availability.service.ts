import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAvailabilityDto } from './dto/create-availability.dto';
import { UpdateAvailabilityDto } from './dto/update-availability.dto';

@Injectable()
export class AvailabilityService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateAvailabilityDto) {
    return this.prisma.availability.create({ data });
  }

  findAll() {
    return this.prisma.availability.findMany();
  }

  findOne(availabilityId: string) {
    return this.prisma.availability.findUnique({ where: { availabilityId } });
  }

  update(availabilityId: string, data: UpdateAvailabilityDto) {
    return this.prisma.availability.update({ where: { availabilityId }, data });
  }

  remove(availabilityId: string) {
    return this.prisma.availability.delete({ where: { availabilityId } });
  }
}
