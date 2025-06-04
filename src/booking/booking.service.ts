import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
function parseTime(date: string, time: string): Date {
  const [hour, minute] = time.split(':').map(Number);

  if (
    isNaN(hour) ||
    isNaN(minute) ||
    hour < 0 || hour > 23 ||
    minute < 0 || minute > 59
  ) {
    throw new Error(`Hora inválida: "${time}"`);
  }

  const result = new Date(date);
  result.setHours(hour, minute, 0, 0);
  return result;
}
@Injectable()
export class BookingService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateBookingDto) {
    const { studentId: userId, counselorId, date, startTime, endTime, status } = dto;

    // Buscar el Student a partir del userID
    const student = await this.prisma.student.findUnique({
      where: { userID: userId },
    });

    if (!student) {
      throw new BadRequestException(`No se encontró un estudiante con el userID: ${userId}`);
    }

    const bookingDate = new Date(date);
    const start = parseTime(date, startTime);
    const end = parseTime(date, endTime);

    return this.prisma.booking.create({
      data: {
        studentId: student.studentId,
        counselorId,
        date: bookingDate,
        startTime: start,
        endTime: end,
        status: status ?? 'booked',
      },
    });
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
