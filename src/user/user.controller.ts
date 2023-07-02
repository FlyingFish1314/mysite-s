import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config/dist';
import { User } from './user.entity';
@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  @Get()
  getUsers(): any {
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
