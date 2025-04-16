// src/user/user.controller.ts
import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(@Body() body: CreateUserDto) {
    return this.userService.signup(body);
  }

  @Post('login')
  async login(
    @Body() body: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.userService.login(body, res);
  }
}
