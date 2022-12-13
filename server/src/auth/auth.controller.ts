import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { OauthNaverDto } from './dto/oauth-naver.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/validate')
  test(@Req() request: Request) {
    return this.authService.validateLogin(request);
  }

  @Get('/logout')
  logout(@Req() request: Request) {
    return this.authService.logout(request);
  }

  @Post('/oauth/naver')
  loginNaver(
    @Body(ValidationPipe) oauthNaverDto: OauthNaverDto,
    @Req() request: Request,
  ) {
    return this.authService.loginNaver(oauthNaverDto, request);
  }
}
