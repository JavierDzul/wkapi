import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { CounselorService } from './counselor.service';
import { CreateCounselorDto } from './dto/create-counselor.dto';
import { UpdateCounselorDto } from './dto/update-counselor.dto';
import { PublicCounselorProfileDto } from './dto/public-counselor-profile.dto';
import { CounselorSummaryDto } from './dto/counselor-summary.dto';

@Controller('counselors')
export class CounselorController {
  constructor(private readonly counselorService: CounselorService) {}

  @Post()
  create(@Body() createCounselorDto: CreateCounselorDto) {
    return this.counselorService.create(createCounselorDto);
  }

  @Get()
  findAll() : Promise<CounselorSummaryDto[]>{
    return this.counselorService.findAll();
  }
  // New endpoint for the public profile
  @Get(':counselorId/public-profile')
  async getPublicProfile(@Param('counselorId') counselorId: string): Promise<PublicCounselorProfileDto> {
    try {
      return await this.counselorService.getPublicProfile(counselorId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw error; // Re-throw other errors
    }
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
