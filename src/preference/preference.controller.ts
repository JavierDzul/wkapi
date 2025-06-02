import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PreferenceService } from './preference.service';
import { CreatePreferenceDto } from './dto/create-preference.dto';
import { UpdatePreferenceDto } from './dto/update-preference.dto';

@Controller('preferences')
export class PreferenceController {
  constructor(private readonly preferenceService: PreferenceService) {}

  @Post()
  create(@Body() createPreferenceDto: CreatePreferenceDto) {
    return this.preferenceService.create(createPreferenceDto);
  }

  @Get()
  findAll() {
    return this.preferenceService.findAll();
  }

  @Get(':preferenceId')
  findOne(@Param('preferenceId') preferenceId: string) {
    return this.preferenceService.findOne(preferenceId);
  }

  @Patch(':preferenceId')
  update(@Param('preferenceId') preferenceId: string, @Body() updatePreferenceDto: UpdatePreferenceDto) {
    return this.preferenceService.update(preferenceId, updatePreferenceDto);
  }

  @Delete(':preferenceId')
  remove(@Param('preferenceId') preferenceId: string) {
    return this.preferenceService.remove(preferenceId);
  }
}
