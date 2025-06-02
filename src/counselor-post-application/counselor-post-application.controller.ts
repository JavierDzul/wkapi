import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CounselorPostApplicationService } from './counselor-post-application.service';
import { CreateCounselorPostApplicationDto } from './dto/create-counselor-post-application.dto';
import { UpdateCounselorPostApplicationDto } from './dto/update-counselor-post-application.dto';

@Controller('counselor-post-application')
export class CounselorPostApplicationController {
  constructor(
    private readonly service: CounselorPostApplicationService,
  ) {}

  @Post()
  create(@Body() dto: CreateCounselorPostApplicationDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateCounselorPostApplicationDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
