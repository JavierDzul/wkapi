import { Controller, Post, Query, Body, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('/track')
export class TrackController {
  constructor(private prisma: PrismaService) {}

  @Post()
async trackLead(@Query('key') key: string, @Body() body: any) {
  const publisher = await this.prisma.publisher.findUnique({ where: { apiKey: key } });
  if (!publisher) throw new BadRequestException('Invalid API key');

  // Extract known fields
  const {
    pageUrl, pageTitle, referrer, userAgent, platform, language,
    screenWidth, screenHeight, timestamp, ...extraFields
  } = body;

  await this.prisma.lead.create({
    data: {
      publisherId: publisher.id,
      pageUrl,
      pageTitle,
      referrer,
      userAgent,
      platform,
      language,
      screenWidth: Number(screenWidth),
      screenHeight: Number(screenHeight),
      timestamp: timestamp ? new Date(timestamp) : new Date(),
      formData: extraFields, // Store all extra fields here
    },
  });

  return { success: true };
}
}