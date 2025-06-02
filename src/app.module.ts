import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

import { StudentModule } from './student/student.module';
import { CounselorModule } from './counselor/counselor.module';
import { PreferenceModule } from './preference/preference.module';
import { AvailabilityModule } from './availability/availability.module';
import { BookingModule } from './booking/booking.module';
import { StudentPostModule } from './student-post/student-post.module';
import { CounselorPostApplicationModule } from './counselor-post-application/counselor-post-application.module';




@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    PrismaModule,
    UserModule,
    StudentModule,
    CounselorModule,
    PreferenceModule,
    AvailabilityModule,
    BookingModule,
    StudentPostModule,
    CounselorPostApplicationModule,
    
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
