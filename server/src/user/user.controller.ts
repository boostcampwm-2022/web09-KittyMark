import {
  Controller,
  Post,
  Get,
  Body,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CheckNameDto } from './dto/check-name.dto';
import { GetProfileInfoDto } from './dto/get-profile-info.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/nameCheck')
  checkName(@Body(ValidationPipe) checkNameDto: CheckNameDto) {
    return this.userService.checkName(checkNameDto);
  }

  @Get('/profile-info')
  getUserInfo(@Query(ValidationPipe) getProfileInfoDto: GetProfileInfoDto) {
    return this.userService.getUserInfo(getProfileInfoDto);
  }
}
