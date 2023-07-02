import { Controller, Delete, Get, Logger, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config/dist';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  // private logger = new Logger(UserController.name);
  constructor(
    private userService: UserService,
    private configService: ConfigService,
    private readonly logger: Logger,
  ) {
    this.logger.log('UserController init');
  }

  @Get()
  getUsers(): any {
    this.logger.log(`请求getUsers成功`);
    this.logger.warn(`请求getUsers成功`);
    this.logger.error(`请求getUsers成功`);
    return this.userService.findAll();
  }

  @Post()
  addUser(info: Partial<User>): any {
    console.log(
      '🚀 ~ file: user.controller.ts:19 ~ UserController ~ addUser ~ info:',
      info,
    );
    info = {
      username: 'aaa',
      password: 'bba',
      email: 'ccc',
    };
    return this.userService.create(info);
  }

  @Patch()
  updateUser(): any {
    const user = { username: 'username' } as User;
    return this.userService.update(1, user);
  }

  @Delete()
  deleteUser(): any {
    return this.userService.remove(1);
  }

  @Get('/profile')
  getUserProfile(): any {
    return this.userService.findProfile(2);
  }
}
