import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Query,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { CheckNameDto } from './dto/check-name.dto';
import { GetProfileInfoDto } from './dto/get-profile-info.dto';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @Patch('/info')
  @UseInterceptors(FileInterceptor('image'))
  updateUserInfo(
    @UploadedFile() image: Express.Multer.File,
    @Body(ValidationPipe) updateUserInfoDto: UpdateUserInfoDto,
  ) {
    return this.userService.updateUserInfo(updateUserInfoDto, image);
  }
}
