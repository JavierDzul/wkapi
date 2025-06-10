import { Module } from '@nestjs/common';
import { ScriptController } from './script.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ScriptController],
  providers: [PrismaService],
})
export class ScriptModule {}