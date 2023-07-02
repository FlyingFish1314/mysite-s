import {
  Controller,
  Delete,
  Get,
  Inject,
  LoggerService,
  Patch,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config/dist';
import { User } from './user.entity';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Controller('user')
export class UserController {
  // private logger = new Logger(UserController.name);
  constructor(
    private userService: UserService,
    private configService: ConfigService,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {
    this.logger.log('UserController init');
  }

  @Get()
  getUsers(): any {
    const user = { isAdmin: false };
    if (!user.isAdmin) {
      throw new UnauthorizedException('用户没有权限');
      // throw new HttpException(
      //   'User is not admin, Forbidden to access getAllUsers',
      //   HttpStatus.FORBIDDEN,
      // );
    }
    // this.logger.log(`请求getUsers成功`);
    // this.logger.warn(`请求getUsers成功`);
    // this.logger.error(`请求getUsers成功`);
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
