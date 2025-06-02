import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingService {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateBookingDto) {
    return this.prisma.booking.create({ data });
  }

  findAll() {
    return this.prisma.booking.findMany();
  }

  findOne(bookingId: string) {
    return this.prisma.booking.findUnique({ where: { bookingId } });
  }

  update(bookingId: string, data: UpdateBookingDto) {
    return this.prisma.booking.update({ where: { bookingId }, data });
  }

  remove(bookingId: string) {
    return this.prisma.booking.delete({ where: { bookingId } });
  }
}
