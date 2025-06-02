import { User } from "src/user/entities/user.entity";

export class Student {
  studentId: string;
  userID: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}
