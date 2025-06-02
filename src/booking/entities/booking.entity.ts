import { BookingStatus } from "generated/prisma";

export class Booking {
  bookingId: string;
  studentId: string;
  counselorId: string;
  status: BookingStatus;
  date: Date;
  startTime: Date;
  endTime: Date;
  createdAt: Date;
  updatedAt: Date;
}
