import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller() // your-domain.com/ kalo mau /users misal perlu di perjelas didalem @Controller('users')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
