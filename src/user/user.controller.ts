import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config/dist';
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  @Get()
  getUsers(): any {
    const db = this.configService.get('DB');
    const host = this.configService.get('DB_HOST');
    console.log(
      '🚀 ~ file: user.controller.ts:15 ~ UserController ~ getUsers ~ host:',
      host,
    );
    console.log(
      '🚀 ~ file: user.controller.ts:14 ~ UserController ~ getUsers ~ db:',
      db,
    );
    return this.userService.getUsers();
  }
}
