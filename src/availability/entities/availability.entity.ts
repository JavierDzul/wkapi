import { weekday } from "generated/prisma";

export class Availability {
  availabilityId: string;
  counselorId: string;
  weekday: weekday;
  startTime: Date;
  endTime: Date;
  createdAt: Date;
  updatedAt: Date;
}
