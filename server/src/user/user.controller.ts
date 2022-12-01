import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Query,
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { CheckNameDto } from './dto/check-name.dto';
import { GetProfileInfoDto } from './dto/get-profile-info.dto';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';
import { UserService } from './user.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FollowDto } from './dto/follow.dto';

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

  @Post('/follow')
  addFollow(@Body(ValidationPipe) followDto: FollowDto) {
    return this.userService.addFollow(followDto);
  }

  @Delete('/follow')
  deleteFolllow(@Body(ValidationPipe) followDto: FollowDto) {
    return this.userService.deleteFollow(followDto);
  }

  @Get('/follow')
  getFollowList(@Body('userId', ParseIntPipe) userId: number) {
    return this.userService.getFollowList(userId);
  }
}
