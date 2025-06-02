import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CounselorService } from './counselor.service';
import { CreateCounselorDto } from './dto/create-counselor.dto';
import { UpdateCounselorDto } from './dto/update-counselor.dto';

@Controller('counselors')
export class CounselorController {
  constructor(private readonly counselorService: CounselorService) {}

  @Post()
  create(@Body() createCounselorDto: CreateCounselorDto) {
    return this.counselorService.create(createCounselorDto);
  }

  @Get()
  findAll() {
    return this.counselorService.findAll();
  }

  @Get(':counselorId')
  findOne(@Param('counselorId') counselorId: string) {
    return this.counselorService.findOne(counselorId);
  }

  @Patch(':counselorId')
  update(@Param('counselorId') counselorId: string, @Body() updateCounselorDto: UpdateCounselorDto) {
    return this.counselorService.update(counselorId, updateCounselorDto);
  }

  @Delete(':counselorId')
  remove(@Param('counselorId') counselorId: string) {
    return this.counselorService.remove(counselorId);
  }
}
