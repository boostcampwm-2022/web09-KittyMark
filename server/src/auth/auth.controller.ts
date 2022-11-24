import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { RegisterUserDto } from './dto/user-register.dto';
import { OauthNaverDto } from './dto/oauth-naver.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/validate')
  test(@Req() request: Request) {
    return this.authService.validateLogin(request);
  }

  @Post('/register')
  @UsePipes(ValidationPipe)
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @Get('/logout')
  logout(@Req() request: Request) {
    return this.authService.logout(request);
  }

  @Post('/oauth/naver')
  loginNaver(@Body() oauthNaverDto: OauthNaverDto, @Req() request: Request) {
    return this.authService.loginNaver(oauthNaverDto, request);
  }
}
