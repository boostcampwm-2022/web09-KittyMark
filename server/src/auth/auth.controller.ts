import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { RegisterUserDto } from 'src/user/user-register.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  @Get('/test')
  test(@Req() request: Request) {
    return this.authService.validateLogin(request);
  }

  @Post('/register')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.userService.register(registerUserDto);
  }

  @Get('/logout')
  logout(@Req() request: Request) {
    return this.authService.logout(request);
  }
}
