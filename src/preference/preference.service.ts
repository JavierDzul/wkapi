import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePreferenceDto } from './dto/create-preference.dto';
import { UpdatePreferenceDto } from './dto/update-preference.dto';

@Injectable()
export class PreferenceService {
  constructor(private prisma: PrismaService) {}

  create(data: CreatePreferenceDto) {
    return this.prisma.preference.create({ data });
  }

  findAll() {
    return this.prisma.preference.findMany();
  }

  findOne(preferenceId: string) {
    return this.prisma.preference.findUnique({ where: { preferenceId } });
  }

  update(preferenceId: string, data: UpdatePreferenceDto) {
    return this.prisma.preference.update({ where: { preferenceId }, data });
  }

  remove(preferenceId: string) {
    return this.prisma.preference.delete({ where: { preferenceId } });
  }


async getPreferencesWithHierarchy() {
  Logger.log('Fetching main preferences with hierarchy...');
  const mainPreferences = await this.prisma.preference.findMany({
    where: { fatherPreferenceId: null },
    include: {
       childPreferences: true,
    },
  });

  
  Logger.log('Main Preferences with Hierarchy:', mainPreferences);

  return mainPreferences;
}


}
