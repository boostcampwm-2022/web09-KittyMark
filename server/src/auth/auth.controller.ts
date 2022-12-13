import {
  Controller,
  Get,
  Post,
  Body,
  Req,
  UseInterceptors,
  UploadedFile,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { RegisterUserDto } from './dto/user-register.dto';
import { OauthNaverDto } from './dto/oauth-naver.dto';
import { OauthGithubDto } from './dto/oauth-github.dto';
import { AuthService } from './auth.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CheckNameDto } from '../auth/dto/check-name.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/validate')
  test(@Req() request: Request) {
    return this.authService.validateLogin(request);
  }

  @Post('/register')
  @UseInterceptors(FileInterceptor('image'))
  register(
    @UploadedFile() image: Express.Multer.File,
    @Body(new ValidationPipe()) registerUserDto: RegisterUserDto,
  ) {
    return this.authService.register(image, registerUserDto);
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

  @Post('/oauth/github')
  loginGithub(
    @Body(ValidationPipe) oauthGithubDto: OauthGithubDto,
    @Req() request: Request,
  ) {
    return this.authService.loginGithub(oauthGithubDto, request);
  }

  @Post('/nameCheck')
  checkName(@Body(ValidationPipe) checkNameDto: CheckNameDto) {
    return this.authService.checkName(checkNameDto);
  }
}
