import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { TrackModule } from './track/track.module';
import { ScriptModule } from './script/script.module';





@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    TrackModule,
    ScriptModule
    
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
