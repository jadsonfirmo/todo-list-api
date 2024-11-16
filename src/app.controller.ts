import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: "Check api's health",
  })
  @ApiResponse({ status: 200, description: 'Health status.' })
  getHello(): string {
    return this.appService.getHello();
  }
}
