import { User } from '../../user/entities/user.entity';

export class Counselor {
  counselorId: string;
  userID: string;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}
